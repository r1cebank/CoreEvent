import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-looped-carousel';
import { View, ScrollView, Text, TouchableHighlight, InteractionManager  } from 'react-native';
import PullToRefresh from 'react-native-animated-ptr';
import { Actions } from 'react-native-router-flux';

import { Colors, Assets } from '../../global/globalIncludes';
import styles from './resources/styles';
import icons from './resources/icons';

class HomeView extends Component {
    static propTypes = {
        carousel: React.PropTypes.array,
        config: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }
    onRefresh = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            this.setState({ isRefreshing: false });
        }, 5000);
    }
    renderContent = () => {
        return (
            <ScrollView
                ref={(c) => { this.scrollView = c; }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
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
                                                onPress={() => {
                                                    InteractionManager.runAfterInteractions(() => {
                                                        Actions.carousel({ carouselImage });
                                                    });
                                                }}>
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
                    <ScrollView
                        ref={(c) => { this.buttonDrawer = c; }}
                        horizontal={true}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={200}
                        style={styles.buttonDrawer}
                        contentContainerStyle={styles.buttonDrawerContainer}
                        testID="RestaurantList">
                        {icons.map((icon, index) => {
                            return (
                                <Icon
                                    reverse
                                    key={index}
                                    name={icon.iconName}
                                    onPress={() => {}}
                                    color={Colors[icon.color]} />
                            );
                        })}
                    </ScrollView>
                    <Card
                        title="Your events"
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
                            contentContainerStyle={styles.yourEventContainer}
                            testID="RestaurantList">
                            <View style={{flexDirection: 'row'}}>
                                <Card
                                    imageStyle={{resizeMode: 'cover'}}
                                    containerStyle={{flex: 1, shadowRadius: 0, borderWidth: 0.5, maxWidth: 200, marginRight: 10, margin: 0}}
                                    title='HELLO WORLD 2345678910'
                                    image={Assets.placeholder}>
                                    <Text style={{marginBottom: 10}}>
                                        The idea with React Native Elements is more about component structure than actual design.
                                    </Text>
                                </Card>
                                <Card
                                    containerStyle={{flex: 1, shadowRadius: 0, borderWidth: 0.5, marginRight: 10, margin: 0, maxWidth: 200}}
                                    title='HELLO WORLD'
                                    image={Assets.placeholder}>
                                    <Text style={{marginBottom: 10}}>
                                        The idea with React Native Elements is more about component structure than actual design.
                                    </Text>
                                </Card>
                            </View>
                        </ScrollView>
                    </Card>
                    <Card
                        title="Recommended"
                        titleStyle={styles.cardTitle}
                        containerStyle={styles.cardContainer}>
                        <View style={{flexDirection: 'column'}}>
                            <Card
                                containerStyle={{flex: 1, margin: 0, shadowRadius: 0, marginBottom: 10}}
                                title='HELLO WORLD 2345678910'
                                image={Assets.placeholder}>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                                <Button
                                    small
                                    icon={{name: 'code'}}
                                    backgroundColor='#03A9F4'
                                    fontFamily='Lato'
                                    buttonStyle={{borderRadius: 40, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='VIEW NOW' />
                            </Card>
                            <Card
                                containerStyle={{flex: 1, margin: 0, shadowRadius: 0, marginBottom: 10}}
                                title='HELLO WORLD'
                                image={Assets.placeholder}>
                                <Text style={{marginBottom: 10}}>
                                    The idea with React Native Elements is more about component structure than actual design.
                                </Text>
                                <Button
                                    small
                                    icon={{name: 'code'}}
                                    backgroundColor='#03A9F4'
                                    fontFamily='Lato'
                                    buttonStyle={{borderRadius: 40, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='VIEW NOW' />
                            </Card>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <PullToRefresh
                    isRefreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh}
                    PTRbackgroundColor="#ebebe6"
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
                        styleProps={{ width: 480, height: 200, backgroundColor: '#cccdc8' }}
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
                        imageSrc={Assets.chipmunk}
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
