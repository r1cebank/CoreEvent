import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card, Icon } from 'react-native-elements';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-looped-carousel';
import { View, ScrollView, Text } from 'react-native';
import PullToRefresh from 'react-native-animated-ptr';

import { Storage, Colors, Assets, Views, Components } from '../../global/globalIncludes';
import styles from './resources/styles';

class HomeView extends Component {
    static propTypes = {
        carousel: React.PropTypes.array
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
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={200}
                style={styles.scrollView}>
                <View style={styles.container}>
                    <Carousel
                        delay={10000}
                        style={styles.carousel}
                        autoplay>
                        {this.props.carousel.map((carouselImage, index) => {
                            return (
                                <Image
                                    key={index}
                                    source={{ uri: carouselImage.image.url }}
                                    indicator={Progress.CircleSnail}
                                    indicatorProps={{
                                        showsText: true
                                    }}
                                    style={styles.carouselImage} />
                            );
                        })}
                    </Carousel>
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
                        <Icon
                            reverse
                            name="person-pin"
                            onPress={() => console.log('hello')}
                            color='#05a8aa' />
                        <Icon
                            reverse
                            name="near-me"
                            onPress={() => console.log('hello')}
                            color='#dc602e' />
                        <Icon
                            reverse
                            name="search"
                            onPress={() => console.log('hello')}
                            color='#05b2dc' />
                        <Icon
                            reverse
                            name="favorite"
                            onPress={() => console.log('hello')}
                            color='#EF476F' />
                        <Icon
                            reverse
                            name="new-releases"
                            onPress={() => console.log('hello')}
                            color='#264653' />
                        <Icon
                            reverse
                            name="event"
                            onPress={() => console.log('hello')}
                            color='#00A878' />
                    </ScrollView>
                    <Card>
                        <Text>
                            The idea with React Native Elements
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            The idea with React Native Elements
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            The idea with React Native Elements
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            The idea with React Native Elements
                        </Text>
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
                    componentType={'Image'}
                    imageSrc={Assets.launchpad_bg}
                    styleProps={{ height: 80, resizeMode: 'contain' }}
                    occurrence={'BEFORE_REFRESH'}
                    direction={'MOVE_DOWN'}
                    xValues={{ from: 113 }}
                    yValues={{ from: 0, to: 20 }}
                    shouldHideDuringRefresh={{ toXValue: 113, toYValue: 120 }}
                />
                <PullToRefresh.ScrollAnimation
                    componentType={'View'}
                    xValues={{ from: 50 }}
                    yValues={{ from: 120, to: 20 }}
                    styleProps={styles.circle}
                    occurrence={'BEFORE_REFRESH'}
                    direction={'MOVE_UP'}
                />
                <PullToRefresh.ScrollAnimation
                componentType={'View'}
                xValues={{ from: 0 }}
                yValues={{ from: 10, to: 90 }}
                styleProps={{ width: 480, height: 200, backgroundColor: '#cccdc8' }}
                occurrence={'BEFORE_REFRESH'}
                direction={'MOVE_DOWN'}
                shouldHideDuringRefresh={{ toXValue: 0, toYValue: 120 }}
                >
                <PullToRefresh.FadeAnimation
                componentType={'View'}
                styleProps={styles.circle2}
                occurrence={'BEFORE_REFRESH'}
                fadeType={'FADE_IN'}
                maxOpacity={0.1}
                minOpacity={0}
                />
                </PullToRefresh.ScrollAnimation>
                <PullToRefresh.TimedAnimation
                componentType={'Image'}
                imageSrc={Assets.cloud2}
                styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
                occurrence={'DURING_REFRESH'}
                xValues={{from:80}}
                yValues={{from:-60, to:120}}
                duration={1300}
                shouldRepeat={true}
                />
                <PullToRefresh.TimedAnimation
                componentType={'Image'}
                imageSrc={Assets.cloud2}
                styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
                occurrence={'DURING_REFRESH'}
                xValues={{from:30}}
                yValues={{from:-20, to:120}}
                duration={1500}
                shouldRepeat={true}
                />
                <PullToRefresh.TimedAnimation
                componentType={'Image'}
                imageSrc={Assets.cloud2}
                styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
                occurrence={'DURING_REFRESH'}
                xValues={{from:190}}
                yValues={{from:-20, to:120}}
                duration={800}
                shouldRepeat={true}
                />
                <PullToRefresh.TimedAnimation
                componentType={'Image'}
                imageSrc={Assets.cloud2}
                styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
                occurrence={'DURING_REFRESH'}
                xValues={{from:140}}
                yValues={{from:-20, to:120}}
                duration={1400}
                shouldRepeat={true}
                />
                <PullToRefresh.TimedAnimation
                componentType={'Image'}
                imageSrc={Assets.cloud2}
                styleProps={{height: 20, width: 100,resizeMode: 'contain'}}
                occurrence={'DURING_REFRESH'}
                xValues={{from:250}}
                yValues={{from:-20, to:120}}
                duration={1400}
                shouldRepeat={true}
                />
                <PullToRefresh.ScrollAnimation
                componentType={'Image'}
                imageSrc={Assets.flame}
                direction={'MOVE_DOWN'}
                styleProps={{height: 15, resizeMode: 'contain'}}
                occurrence={'DURING_REFRESH'}
                xValues={{from:182}}
                yValues={{from:94, to:94}}
                shouldRotate= {{direction: 'CLOCKWISE', rotationType: 'ROTATE_CONTINUOUSLY', endRotationDeg:'12deg', rotationTiming: 100, shouldRotateBack: true}}
                />
                <PullToRefresh.TimedAnimation
                componentType={'Image'}
                xValues={{from:180}}
                yValues={{from:60, to:120}}
                duration={300}
                styleProps={{height:40, width: 40, opacity: .7}}
                occurrence={'DURING_REFRESH'}
                direction={'MOVE_DOWN'}
                imageSrc={Assets.smoke}
                />
                <PullToRefresh.ScrollAnimation
                componentType={'Image'}
                imageSrc={Assets.ship_bg}
                direction={'MOVE_DOWN'}
                styleProps={{height: 80, resizeMode: 'contain'}}
                occurrence={'BEFORE_REFRESH'}
                xValues={{from:140}}
                yValues={{from:-120, to:20}}
                />
                <PullToRefresh.ScrollAnimation
                componentType={'Image'}
                imageSrc={Assets.chipmunk}
                direction={'MOVE_DOWN'}
                styleProps={{height: 30, resizeMode: 'contain'}}
                occurrence={'BEFORE_REFRESH'}
                xValues={{from:178}}
                yValues={{from:0, to:55}}
                />
                <PullToRefresh.ScrollAnimation
                componentType={'Image'}
                imageSrc={Assets.ship}
                direction={'MOVE_DOWN'}
                styleProps={{height: 80, resizeMode: 'contain'}}
                occurrence={'BEFORE_REFRESH'}
                xValues={{from:140}}
                yValues={{from:-120, to:20}}
                />
                <PullToRefresh.ScrollAnimation
                componentType={'Image'}
                xValues={{from:30, to: 30}}
                yValues={{from:120, to:100}}
                styleProps={{height: 25, resizeMode: 'contain'}}
                occurrence={'BEFORE_REFRESH'}
                direction={'MOVE_UP'}
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
    carousel: []
};

function select(store) {
    return {
        carousel: store.data.carousel,
        locale: store.settings.locale,
        inDebug: store.settings.inDebug,
        loading: store.utils.loading
    };
}

module.exports = connect(select)(HomeView);
