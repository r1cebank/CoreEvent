import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Card, Icon, Button } from 'react-native-elements';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-looped-carousel';
// import PullToRefresh from 'react-native-animated-ptr';
import { Actions } from 'react-native-router-flux';
import Markdown from 'react-native-simple-markdown';

import {
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    InteractionManager,
    RefreshControl
} from 'react-native';

import { Colors, Assets, Languages, Components } from '../../global/globalIncludes';
import styles from './resources/styles';
// import icons from './resources/icons';

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
    componentDidMount() {
        Actions.refresh({ title: Languages.t('whatshot', this.props.locale) });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.locale !== this.props.locale) {
            Actions.refresh({ title: Languages.t('whatshot', nextProps.locale) });
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
        const markdown = 'Want to learn about how to program? Now you can, join use after school in room H19 and lets learn about programming';
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
                            title={Languages.t('recommended', this.props.locale)}
                            titleStyle={styles.cardTitle}
                            containerStyle={styles.cardContainer}>
                            <View style={styles.recommendedContainer}>
                                <Card
                                    containerStyle={styles.eventCard}
                                    title="Test event"
                                    titleStyle={{ fontWeight: 'bold' }}
                                    image={{ uri: 'https://parse.agreatstartup.com/parse/files/GuideFree/d94120ca-e9e3-4ae5-bba5-0481bb1d9bc2_codeclub.png'}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                        <Icon name="schedule" size={20} color={Colors.grey} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Thursday, October 27</Text>
                                            <Text>9:30 pm - 12:30 pm</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                        <Icon name="location-on" size={20} color={Colors.grey} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Room H19</Text>
                                            <Text>7131 Stride Ave</Text>
                                        </View>
                                    </View>
                                    <Components.ExpandableMarkdown style={{ marginBottom: 10 }}>
                                        {markdown}
                                    </Components.ExpandableMarkdown>
                                    <Button
                                        small
                                        icon={{ name: 'add' }}
                                        backgroundColor="#03A9F4"
                                        fontFamily="NotoSans-Bold"
                                        buttonStyle={styles.eventCardButton}
                                        title={Languages.t('addToMe', this.props.locale)} />
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
