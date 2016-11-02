import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Card, Icon } from 'react-native-elements';
// import Carousel from 'react-native-looped-carousel';
import PullToRefresh from 'react-native-animated-ptr';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import {
    View,
    Text,
    ScrollView,
    InteractionManager,
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
        showModal: React.PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }
    componentDidMount() {
        Actions.refresh({ title: Languages.t('whatshot', this.props.locale) });
    }
    async componentWillReceiveProps(nextProps) {
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
    renderContent() {
        return (
            <ScrollView
                ref={(c) => { this.scrollView = c; }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
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
            </ScrollView>
        );
    }
    render() {
        return (
            <PullToRefresh
                style={styles.container}
                isRefreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
                PTRbackgroundColor="#B4E4ED"
                contentBackgroundColor={Colors.backgroundColor}
                contentComponent={this.renderContent()}>
                <PullToRefresh.ScrollAnimation
                    componentType="Image"
                    imageSrc={Assets.launchpad_bg}
                    styleProps={{ height: 80, resizeMode: 'contain' }}
                    occurrence="BEFORE_REFRESH"
                    direction="MOVE_DOWN"
                    xValues={{ from: 113 }}
                    yValues={{ from: 0, to: 20 }}
                    shouldHideDuringRefresh={{ toXValue: 113, toYValue: 120 }}
                    />
                <PullToRefresh.ScrollAnimation
                    componentType="View"
                    xValues={{ from: 50 }}
                    yValues={{ from: 120, to: 20 }}
                    styleProps={styles.circle}
                    occurrence="BEFORE_REFRESH"
                    direction="MOVE_UP"
                    />
                <PullToRefresh.ScrollAnimation
                    componentType="View"
                    xValues={{ from: 0 }}
                    yValues={{ from: 10, to: 90 }}
                    styleProps={{ width: 480, height: 200, backgroundColor: '#FFFFFF' }}
                    occurrence="BEFORE_REFRESH"
                    direction="MOVE_DOWN"
                    shouldHideDuringRefresh={{ toXValue: 0, toYValue: 120 }}
                    >
                    <PullToRefresh.FadeAnimation
                        componentType="View"
                        styleProps={styles.circle2}
                        occurrence="BEFORE_REFRESH"
                        fadeType="FADE_IN"
                        maxOpacity={0.1}
                        minOpacity={0}
                        />
                </PullToRefresh.ScrollAnimation>
                <PullToRefresh.TimedAnimation
                    componentType="Image"
                    imageSrc={Assets.cloud2}
                    styleProps={styles.clouds}
                    occurrence="DURING_REFRESH"
                    xValues={{ from: 80 }}
                    yValues={{ from: -60, to: 120 }}
                    duration={1300}
                    shouldRepeat={true}
                    />
                <PullToRefresh.TimedAnimation
                    componentType="Image"
                    imageSrc={Assets.cloud2}
                    styleProps={styles.clouds}
                    occurrence="DURING_REFRESH"
                    xValues={{ from: 30 }}
                    yValues={{ from: -20, to: 120 }}
                    duration={1500}
                    shouldRepeat={true}
                    />
                <PullToRefresh.TimedAnimation
                    componentType="Image"
                    imageSrc={Assets.cloud2}
                    styleProps={styles.clouds}
                    occurrence="DURING_REFRESH"
                    xValues={{ from: 190 }}
                    yValues={{ from: -20, to: 120 }}
                    duration={800}
                    shouldRepeat={true}
                    />
                <PullToRefresh.TimedAnimation
                    componentType="Image"
                    imageSrc={Assets.cloud2}
                    styleProps={styles.clouds}
                    occurrence="DURING_REFRESH"
                    xValues={{ from: 140 }}
                    yValues={{ from: -20, to: 120 }}
                    duration={1400}
                    shouldRepeat={true}
                    />
                <PullToRefresh.TimedAnimation
                    componentType="Image"
                    imageSrc={Assets.cloud2}
                    styleProps={styles.clouds}
                    occurrence="DURING_REFRESH"
                    xValues={{ from: 250 }}
                    yValues={{ from: -20, to: 120 }}
                    duration={1400}
                    shouldRepeat={true}
                    />
                <PullToRefresh.ScrollAnimation
                    componentType="Image"
                    imageSrc={Assets.flame}
                    direction="MOVE_DOWN"
                    styleProps={{ height: 15, resizeMode: 'contain' }}
                    occurrence="DURING_REFRESH"
                    xValues={{ from: 182 }}
                    yValues={{ from: 94, to: 94 }}
                    shouldRotate={{
                        direction: 'CLOCKWISE',
                        rotationType: 'ROTATE_CONTINUOUSLY',
                        endRotationDeg: '12deg',
                        rotationTiming: 100,
                        shouldRotateBack: true
                    }}
                    />
                <PullToRefresh.TimedAnimation
                    componentType="Image"
                    xValues={{ from: 180 }}
                    yValues={{ from: 60, to: 120 }}
                    duration={300}
                    styleProps={{ height: 40, width: 40, opacity: 0.7 }}
                    occurrence="DURING_REFRESH"
                    direction="MOVE_DOWN"
                    imageSrc={Assets.smoke}
                    />
                <PullToRefresh.ScrollAnimation
                    componentType="Image"
                    imageSrc={Assets.ship_bg}
                    direction="MOVE_DOWN"
                    styleProps={{ height: 80, resizeMode: 'contain' }}
                    occurrence="BEFORE_REFRESH"
                    xValues={{ from: 140 }}
                    yValues={{ from: -120, to: 20 }}
                    />
                <PullToRefresh.ScrollAnimation
                    componentType="Image"
                    imageSrc={Assets.bear}
                    direction="MOVE_DOWN"
                    styleProps={{ height: 30, resizeMode: 'contain' }}
                    occurrence="BEFORE_REFRESH"
                    xValues={{ from: 178 }}
                    yValues={{ from: 0, to: 55 }}
                    />
                <PullToRefresh.ScrollAnimation
                    componentType="Image"
                    imageSrc={Assets.ship}
                    direction="MOVE_DOWN"
                    styleProps={{ height: 80, resizeMode: 'contain' }}
                    occurrence="BEFORE_REFRESH"
                    xValues={{ from: 140 }}
                    yValues={{ from: -120, to: 20 }}
                    />
                <PullToRefresh.ScrollAnimation
                    componentType="Image"
                    xValues={{ from: 30, to: 30 }}
                    yValues={{ from: 120, to: 100 }}
                    styleProps={{ height: 25, resizeMode: 'contain' }}
                    occurrence="BEFORE_REFRESH"
                    direction="MOVE_UP"
                    shouldTriggerAt={121}
                    removeAfterRefresh={true}
                    imageSrc={Assets.release}
                    />
            </PullToRefresh>
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
