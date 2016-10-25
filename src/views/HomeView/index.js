import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-looped-carousel';
// import PullToRefresh from 'react-native-animated-ptr';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import {
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    InteractionManager,
    RefreshControl
} from 'react-native';

import { Colors, Assets, Languages, Components, Storage } from '../../global/globalIncludes';
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
                                                <TouchableHighlight
                                                    key={index}
                                                    onPress={() =>
                                                        this.openCarousel(carouselImage)}>
                                                    <Image
                                                        source={{ uri: carouselImage.image.url }}
                                                        indicator={Progress.CircleSnail}
                                                        style={styles.carouselImage} />
                                                </TouchableHighlight>
                                            );
                                        })}
                                    </Carousel>
                                );
                            }
                            return null;
                        })()}
                        <Card
                            title={Languages.t('myEvents', this.props.locale)}
                            titleStyle={styles.cardTitle}
                            containerStyle={styles.cardContainer}>
                            <ScrollView
                                ref={(c) => { this.yourEvent = c; }}
                                horizontal={true}
                                automaticallyAdjustContentInsets={false}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                scrollEventThrottle={200}
                                style={styles.yourEvent}
                                contentContainerStyle={styles.yourEventContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <Components.MyEventTile
                                        eventTitle="Test Event"
                                        imageSource={Assets.placeholder}
                                        venueName="Room H19"
                                        status="joined"
                                        locale={this.props.locale}
                                        venueAddress="1 Infinite Loop"
                                        startTime={new Date()} />
                                    <Components.MyEventTile
                                        eventTitle="Test Event 2"
                                        imageSource={Assets.placeholder}
                                        venueName="Room H19"
                                        status="joined"
                                        locale={this.props.locale}
                                        venueAddress="1 Infinite Loop"
                                        startTime={new Date()} />
                                </View>
                            </ScrollView>
                        </Card>
                        <Card
                            title={Languages.t('recommended', this.props.locale)}
                            titleStyle={styles.cardTitle}
                            containerStyle={styles.cardContainer}>
                            <View style={styles.recommendedContainer}>
                                <Components.EventTile
                                    eventTitle="Code club"
                                    imageSource={{ uri: 'https://parse.agreatstartup.com/parse/files/GuideFree/d94120ca-e9e3-4ae5-bba5-0481bb1d9bc2_codeclub.png' }}
                                    venueName="Room H18"
                                    venueAddress="7131 Stride Ave"
                                    description="Want to learn about how to program? Now you can, join use after school in room H19 and lets learn about programming"
                                    ctaTitle={Languages.t('addToMe', this.props.locale)}
                                    startTime={new Date()} />
                            </View>
                        </Card>
                    </View>
                </ScrollView>
                <Modal style={styles.eventModal} position="bottom" ref={(c) => this.eventModal = c}>
                    <Icon name="keyboard-arrow-down" size={30} color={Colors.grey} />
                    {(() => {
                        if (this.state.modalEventData && this.state.modalLocationData) {
                            return (
                                <Components.EventTile
                                    eventTitle={this.state.modalEventData.get('name')}
                                    imageSource={{
                                        uri: this.state.modalEventData.get('image').url()
                                    }}
                                    simple={true}
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
