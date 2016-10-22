/* eslint-disable */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class CarouselView extends Component {
    componentWillMount() {
        Actions.refresh({ title: this.props.carouselImage.name });
    }
    render() {
        return (
            <View style={{ margin: 128 }}>
                <Text>Carousel View</Text>
            </View>
        );
    }
}

module.exports = CarouselView;
