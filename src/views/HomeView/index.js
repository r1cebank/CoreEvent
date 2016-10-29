import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';
import Carousel from 'react-native-looped-carousel';
import ActionSheet from 'react-native-actionsheet';
// import PullToRefresh from 'react-native-animated-ptr';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import {
    View,
    ScrollView,
    InteractionManager,
    RefreshControl
} from 'react-native';

import { Colors, Assets, Languages, Components } from '../../global/globalIncludes';
import styles from './resources/styles';
import actionSheets from './resources/actionsheets';
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
        if (nextProps.locale !== this.props.locale) {
            Actions.refresh({ title: Languages.t('whatshot', nextProps.locale) });
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
                      />
                    }>
                    <View style={styles.container}>
                        {(() => {
                            if (this.props.config.attributes.show_carousel) {
                                return (
                                    <Carousel
                                        delay={10000}
                                        style={styles.carousel}
                                        autoplay>
                                        {this.props.carousel.map((carouselImage, index) => {
                                            return (
                                                <Components.CarouselImage
                                                    key={index}
                                                    carouselImage={carouselImage}
                                                    onPress={this.openCarousel} />
                                            );
                                        })}
                                    </Carousel>
                                );
                            }
                            return null;
                        })()}
                        <Card
                            title={Languages.t('myEvents', this.props.locale)}
                            dividerStyle={styles.myEventDividerStyle}
                            titleStyle={styles.myEventCardTitle}
                            containerStyle={styles.myCardContainer}>
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
                                        imageSource={{ uri: 'https://parse.agreatstartup.com/parse/files/GuideFree/7dbe40a8-bed7-4917-beb1-e6f5c668207e_150908133651401.jpg' }}
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
                                        imageSource={Assets.placeholder}
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
                        </Card>
                        <Card
                            title={Languages.t('recommended', this.props.locale)}
                            titleStyle={styles.cardTitle}
                            dividerStyle={styles.dividerStyle}
                            containerStyle={styles.cardContainer}>
                            <View style={styles.recommendedContainer}>
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
                            </View>
                        </Card>
                    </View>
                </ScrollView>
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
                <ActionSheet
                    ref={(o) => this.eventActionSheet = o}
                    options={actionSheets.event.buttons}
                    cancelButtonIndex={actionSheets.event.CANCEL_INDEX}
                    destructiveButtonIndex={actionSheets.event.DESTRUCTIVE_INDEX}
                />
                <ActionSheet
                    ref={(o) => this.editActionSheet = o}
                    options={actionSheets.edit.buttons}
                    cancelButtonIndex={actionSheets.edit.CANCEL_INDEX}
                    destructiveButtonIndex={actionSheets.edit.DESTRUCTIVE_INDEX}
                />
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
