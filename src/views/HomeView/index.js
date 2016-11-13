import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Card, Icon } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
// import Carousel from 'react-native-looped-carousel';
// import PullToRefresh from 'react-native-animated-ptr';
import { Actions as RouterActions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import {
    View,
    Text,
    ScrollView,
    InteractionManager,
    TouchableOpacity,
    RefreshControl,
    ListView
} from 'react-native';

import {
    Colors,
    Languages,
    Components,
    Storage,
    Views,
    Store,
    Actions
} from '../../global/globalIncludes';
import styles from './resources/styles';
import Env from '../../env';
// import icons from './resources/icons';




class HomeView extends Component {
    static propTypes = {
        carousel: React.PropTypes.array,
        config: React.PropTypes.object,
        location: React.PropTypes.object,
        locale: React.PropTypes.string,
        modalEventID: React.PropTypes.string,
        showModal: React.PropTypes.bool,
        showNotice: React.PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            notice: {},
            // loading: true,
            showNotice: false,
            isRefreshing: false,
            nearbyDatasource: this.ds.cloneWithRows([])
        };
    }
    async componentDidMount() {
        RouterActions.refresh({
            renderTitle: (navProps) => {
                return (
                    <TouchableOpacity
                        style={{
                            top: 22,
                            padding: 8,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            InteractionManager.runAfterInteractions(() => {
                                RouterActions.addressSearcherPush({
                                    onSelect: this.onAddressSelect
                                });
                            });
                        }}>
                        <Text style={navProps.titleStyle}>
                            {this.props.location.name}
                        </Text>
                        <Icon
                            color={Colors.infraRed}
                            name="keyboard-arrow-down" />
                    </TouchableOpacity>
                );
            }
        });
        // Fetch nearby events
        await this.refreshEvents();
        this.nearbyInterval = setInterval(async () => {
            await this.refreshEvents();
        }, Env.REFRESH_TIMEOUT);
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.showNotice !== this.props.showNotice) {
            if (nextProps.showNotice && nextProps.notice) {
                this.setState({
                    notice: nextProps.notice
                });
                this.popupDialog.openDialog();
                RouterActions.refresh({ showNotice: false });
            }
        }
        if (nextProps.location.name !== this.props.location.name) {
            await this.refreshEvents();
        }
        if (nextProps.showModal !== this.props.showModal) {
            if (nextProps.modalEventData && nextProps.modalLocationData) {
                this.setState({
                    modalEventData: nextProps.modalEventData,
                    modalLocationData: nextProps.modalLocationData
                });
                this.eventModal.open();
                RouterActions.refresh({ showModal: false });
            }
        }
    }
    componentWillUnmount() {
        clearInterval(this.nearbyInterval);
    }
    refreshEvents = async () => {
        // this.setState({ loading: true });
        const events = await Storage.Event.fetchByLocation(this.props.location.location);
        this.setState({ nearbyDatasource: this.ds.cloneWithRows(events) });
        // this.setState({ loading: false });
    }
    onAddressSelect = (address) => {
        Store.appStore.dispatch(Actions.Settings.updateLocation({
            name: address.name,
            location: address.location
        }));
    }
    eventAction = () => {
        this.eventActionSheet.show();
    }
    editStatus = () => {
        this.editActionSheet.show();
    }
    onRefresh = async () => {
        this.setState({ isRefreshing: true });
        await this.refreshEvents();
        this.setState({ isRefreshing: false });
    }
    openCarousel = (carouselImage) => {
        InteractionManager.runAfterInteractions(() => {
            RouterActions.carousel({ carouselImage });
        });
    }
    renderNearbyRow = (rowData) => {
        return (
            <Components.EventTile
                style={styles.nearbyTile}
                eventTitle={rowData.get('name')}
                locale={this.props.locale}
                venueName={rowData.get('location').name}
                venueAddress={rowData.get('location').address}
                onPressSecondary={() => {
                    this.eventAction();
                }}
                description={rowData.get('description')}
                ctaTitle={Languages.t('addToMe', this.props.locale)}
                startTime={rowData.get('start')} />
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh}
                            tintColor={Colors.infraRed}
                        />
                    }>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.header}>
                                {Languages.t('myEvents', this.props.locale)}
                            </Text>
                            <ScrollView
                                ref={(c) => { this.yourEvent = c; }}
                                horizontal={true}
                                automaticallyAdjustContentInsets={false}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                scrollEventThrottle={200}
                                style={styles.yourEvent}
                                contentContainerStyle={styles.yourEventContainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Components.MyEventTile
                                        locale={this.props.locale}
                                        eventTitle="编程爱好者"
                                        venueName="Room H19"
                                        status="joined"
                                        locale={this.props.locale}
                                        onPressStatus={() => {
                                            this.editStatus();
                                        }}
                                        venueAddress="1 Infinite Loop"
                                        startTime={new Date()} />
                                    <Components.MyEventTile
                                        locale={this.props.locale}
                                        eventTitle="Test Event 2"
                                        venueName="Room H19"
                                        status="joined"
                                        locale={this.props.locale}
                                        onPressStatus={() => {
                                            this.editStatus();
                                        }}
                                        venueAddress="1 Infinite Loop"
                                        startTime={new Date()} />
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <Text style={styles.header}>
                                {Languages.t('aroundme', this.props.locale)}
                            </Text>
                            <View style={styles.recommendedContainer}>
                                {(() => {
                                    if (this.state.loading) {
                                        return (
                                            <Views.LoadingView />
                                        );
                                    }
                                    return (
                                        <ListView
                                            style={styles.list}
                                            keyboardShouldPersistTaps={true}
                                            enableEmptySections={true}
                                            dataSource={this.state.nearbyDatasource}
                                            renderRow={this.renderNearbyRow} />
                                    );
                                })()}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <PopupDialog
                    width={0.8}
                    height={200}
                    open={this.state.showNotice}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                    <Components.Notice
                        color={this.state.notice.color}
                        icon={this.state.notice.icon}
                        header={this.state.notice.header}
                        notice={this.state.notice.notice} />
                </PopupDialog>
                <Modal style={styles.eventModal} position="bottom" ref={(c) => this.eventModal = c}>
                    <Icon name="keyboard-arrow-down" size={30} color={Colors.secondary} />
                    {(() => {
                        if (this.state.modalEventData && this.state.modalLocationData) {
                            return (
                                <Components.EventTile
                                    eventTitle={this.state.modalEventData.get('name')}
                                    imageSource={{
                                        uri: this.state.modalEventData.get('image').url()
                                    }}
                                    simple={true}
                                    onPressSecondary={() => {
                                        this.eventAction(this.state.modalEventData);
                                    }}
                                    venueName={this.state.modalLocationData.get('name')}
                                    venueAddress={this.state.modalLocationData.get('address')}
                                    description={this.state.modalEventData.get('description')}
                                    ctaTitle={Languages.t('addToMe', this.props.locale)}
                                    startTime={this.state.modalEventData.get('start')} />
                            );
                        }
                        return null;
                    })()}
                </Modal>
            </View>
        );
    }
}

HomeView.defaultProps = {
    selectedTab: 'home',
    carousel: [],
    location: {
        name: ''
    },
    config: { attributes: {} }
};

function select(store) {
    return {
        carousel: store.data.carousel,
        location: store.settings.location,
        locale: store.settings.locale,
        inDebug: store.settings.inDebug,
        loading: store.utils.loading,
        config: store.settings.config
    };
}

module.exports = connect(select)(HomeView);
