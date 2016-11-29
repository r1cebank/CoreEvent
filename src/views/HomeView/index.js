import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
// import Carousel from 'react-native-looped-carousel';
// import PullToRefresh from 'react-native-animated-ptr';
import ActionSheet from 'react-native-actionsheet';
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
            attendances: [],
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
        // TODO: replace to livequery
        this.nearbySubscription = Storage.Event
            .fetchByLocationSubscription(this.props.location.location);
        this.nearbySubscription.on('create', this.appendEvent);
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
            if (nextProps.modalEventData) {
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
        this.nearbySubscription.unsubscribe();
    }
    appendEvent = (object) => {
        // Append event to the state
        const newEvents = this.state.nearbyEvents.slice(0);
        newEvents.push(object);
        this.setState({
            nearbyEvents: newEvents,
            nearbyDatasource: this.ds.cloneWithRows(newEvents)
        });
    }
    isAttending = (event) => {
        return !!this.state.attendances.filter((attendance) => {
            return attendance.get('event').id === event.id;
        }).length;
    }
    refreshAttending = async () => {
        const attendances = await Storage.Attendance.fetchMine();
        this.setState({ attendances });
    }
    refreshEvents = async () => {
        this.setState({ loading: true });
        const events = await Storage.Event.fetchByLocation(this.props.location.location);
        await this.refreshAttending();
        this.setState({
            nearbyEvents: events,
            nearbyDatasource: this.ds.cloneWithRows(events)
        });
        this.setState({ loading: false });
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
    attend = async (event) => {
        await Storage.Attendance.attend(event, Languages.t('attendanceMessage',
            this.props.locale));
    }
    renderNearbyRow = (rowData) => {
        return (
            <Components.EventTile
                style={styles.nearbyTile}
                attending={this.isAttending(rowData)}
                eventTitle={rowData.get('name')}
                locale={this.props.locale}
                venueName={rowData.get('location').name}
                venueAddress={rowData.get('location').address}
                onPress={() => this.attend(rowData)}
                onPressSecondary={() => this.ActionSheet.show()}
                description={rowData.get('description')}
                ctaTitle={Languages.t('addToMe', this.props.locale)}
                ctaAltTitle={Languages.t('attending', this.props.locale)}
                startTime={rowData.get('start')} />
        );
    }
    render() {
        const ActionSheetOptions = {
            eventMisc: {
                options: [
                    Languages.t('cancel', this.props.locale),
                    Languages.t('favorite', this.props.locale),
                    Languages.t('hide', this.props.locale),
                    Languages.t('report', this.props.locale)
                ],
                CANCEL_INDEX: 0,
                DESTRUCTIVE_INDEX: 3
            }
        };
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
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.header}>
                                    {Languages.t('aroundme', this.props.locale)}
                                </Text>
                                <Text style={styles.header}>
                                    10 公里
                                </Text>
                            </View>
                            <View style={styles.recommendedContainer}>
                                {(() => {
                                    if (this.state.loading && !this.state.isRefreshing) {
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
                        if (this.state.modalEventData) {
                            return (
                                <Components.EventTile
                                    eventTitle={this.state.modalEventData.get('name')}
                                    locale={this.props.locale}
                                    venueName={this.state.modalEventData.get('location').name}
                                    venueAddress={this.state.modalEventData.get('location').address}
                                    onPress={() => this.attend(this.state.modalEventData)}
                                    onPressSecondary={() => this.ActionSheet.show()}
                                    description={this.state.modalEventData.get('description')}
                                    ctaTitle={Languages.t('addToMe', this.props.locale)}
                                    startTime={this.state.modalEventData.get('start')} />
                            );
                        }
                        return null;
                    })()}
                </Modal>
                <ActionSheet
                    ref={(o) => this.ActionSheet = o}
                    options={ActionSheetOptions.eventMisc.options}
                    cancelButtonIndex={ActionSheetOptions.eventMisc.CANCEL_INDEX}
                    destructiveButtonIndex={ActionSheetOptions.eventMisc.DESTRUCTIVE_INDEX}
                    onPress={this._handlePress}
                />
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
