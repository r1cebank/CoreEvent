import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Card, Icon } from 'react-native-elements';
import PopupDialog from 'react-native-popup-dialog';
// import Carousel from 'react-native-looped-carousel';
// import PullToRefresh from 'react-native-animated-ptr';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import {
    View,
    Text,
    ScrollView,
    InteractionManager,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { Colors, Languages, Components, Assets } from '../../global/globalIncludes';
import styles from './resources/styles';
// import icons from './resources/icons';




class HomeView extends Component {
    static propTypes = {
        carousel: React.PropTypes.array,
        config: React.PropTypes.object,
        locale: React.PropTypes.string,
        modalEventID: React.PropTypes.string,
        showModal: React.PropTypes.bool,
        showNotice: React.PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = {
            notice: {},
            showNotice: false,
            isRefreshing: false
        };
    }
    componentDidMount() {
        Actions.refresh({
            renderTitle: (navProps) => {
                return (
                    <TouchableOpacity
                        style={{
                            top: 22,
                            padding: 8,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={Actions.qrScanner}>
                        <Text style={navProps.titleStyle}>
                            {Languages.t('aroundme', this.props.locale)}
                        </Text>
                        <Icon
                            color={Colors.infraRed}
                            name="keyboard-arrow-down" />
                    </TouchableOpacity>
                );
            }
        });
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.showNotice !== this.props.showNotice) {
            if (nextProps.showNotice && nextProps.notice) {
                this.setState({
                    notice: nextProps.notice
                });
                this.popupDialog.openDialog();
                Actions.refresh({ showNotice: false });
            }
        }
        if (nextProps.showModal !== this.props.showModal) {
            if (nextProps.modalEventData && nextProps.modalLocationData) {
                this.setState({
                    modalEventData: nextProps.modalEventData,
                    modalLocationData: nextProps.modalLocationData
                });
                this.eventModal.open();
                Actions.refresh({ showModal: false });
            }
        }
    }
    eventAction = () => {
        this.eventActionSheet.show();
    }
    editStatus = () => {
        this.editActionSheet.show();
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 5000);
    }
    openCarousel = carouselImage => {
        InteractionManager.runAfterInteractions(() => {
            Actions.carousel({ carouselImage });
        });
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
                                {Languages.t('trending', this.props.locale)}
                            </Text>
                            <View style={styles.recommendedContainer}>
                                <Grid>
                                    <Row style={{ marginBottom: 10 }}>
                                        <Components.EventTile
                                            eventTitle="Code club"
                                            locale={this.props.locale}
                                            imageSource={{ uri: 'https://parse.agreatstartup.com/parse/files/GuideFree/d94120ca-e9e3-4ae5-bba5-0481bb1d9bc2_codeclub.png' }}
                                            venueName="Room H18"
                                            venueAddress="7131 Stride Ave"
                                            onPressSecondary={() => {
                                                this.eventAction();
                                            }}
                                            description="Want to learn about how to program? Now you can, join use after school in room H19 and lets learn about programming"
                                            ctaTitle={Languages.t('addToMe', this.props.locale)}
                                            startTime={new Date()} />
                                    </Row>
                                    <Row style={{ marginBottom: 10 }}>
                                        <Components.EventTile
                                            eventTitle="Code club"
                                            locale={this.props.locale}
                                            imageSource={{ uri: 'https://parse.agreatstartup.com/parse/files/GuideFree/d94120ca-e9e3-4ae5-bba5-0481bb1d9bc2_codeclub.png' }}
                                            venueName="Room H18"
                                            venueAddress="7131 Stride Ave"
                                            onPressSecondary={() => {
                                                this.eventAction();
                                            }}
                                            description="Want to learn about how to program? Now you can, join use after school in room H19 and lets learn about programming"
                                            ctaTitle={Languages.t('addToMe', this.props.locale)}
                                            startTime={new Date()} />
                                    </Row>
                                </Grid>
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
    config: { attributes: {} }
};

function select(store) {
    return {
        carousel: store.data.carousel,
        locale: store.settings.locale,
        inDebug: store.settings.inDebug,
        loading: store.utils.loading,
        config: store.settings.config
    };
}

module.exports = connect(select)(HomeView);
