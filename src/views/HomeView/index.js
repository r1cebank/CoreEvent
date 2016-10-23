import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-looped-carousel';
// import PullToRefresh from 'react-native-animated-ptr';
import { Actions } from 'react-native-router-flux';
import {
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    InteractionManager,
    RefreshControl
} from 'react-native';

import { Colors, Assets, Languages } from '../../global/globalIncludes';
import styles from './resources/styles';
import icons from './resources/icons';

class HomeView extends Component {
    static propTypes = {
        carousel: React.PropTypes.array,
        config: React.PropTypes.object,
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }
    componentWillMount() {
        Actions.refresh({ title: Languages.t('whatshot', this.props.locale) });
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
