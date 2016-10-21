import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { View, ScrollView, Text, Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';

import { Storage, Assets, Views, Components } from '../../global/globalIncludes';
import styles from './resources/styles';

class HomeView extends Component {
    async componentWillMount() {
        const response = await Storage.Carousel.fetch();
        debugger;
    }
    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    delay={10000}
                    style={styles.carousel}
                    autoplay
                    onAnimateNextPage={(p) => console.log(p)}>
                    <Image source={{uri: "https://parse.agreatstartup.com/parse/files/GuideFree/aff79cae-753f-4716-bd60-43757b4aac50_carousel1.png"}} style={{ resizeMode: 'cover', backgroundColor: 'red', height: 100 }} />
                    <Image source={{uri: "https://parse.agreatstartup.com/parse/files/GuideFree/d5e2da7d-3966-4730-9342-34526a3d27ee_carousel1.png"}} style={{ resizeMode: 'cover', backgroundColor: 'red', height: 100 }} />
                    <Image source={{uri: "https://parse.agreatstartup.com/parse/files/GuideFree/99d26a82-3f85-4a57-9db4-46e99d9cd1b2_carousel1.png"}} style={{ resizeMode: 'cover', backgroundColor: 'red', height: 100 }} />
                </Carousel>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={200}
                    style={styles.scrollView}
                    testID="RestaurantList">
                    <Card>
                        <Text>
                            The idea with React Native Elements
                        </Text>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

HomeView.defaultProps = {
    selectedTab: 'home'
};

module.exports = HomeView;
