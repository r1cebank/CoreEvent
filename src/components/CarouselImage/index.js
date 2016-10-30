/*
 *  CarouselImage element
 */

import React, { Component } from 'react';
import * as Progress from 'react-native-progress';
import { TouchableHighlight } from 'react-native';
import Image from 'react-native-image-progress';

import styles from './resources/styles';

class CarouselImage extends Component {
    static propTypes = {
        onPress: React.PropTypes.func,
        carouselImage: React.PropTypes.object
    }
    render() {
        return (
            <TouchableHighlight
                onPress={() =>
                    this.props.onPress(this.props.carouselImage)}>
                <Image
                    source={{ uri: this.props.carouselImage.image.url }}
                    indicator={Progress.CircleSnail}
                    style={styles.carouselImage} />
            </TouchableHighlight>
        );
    }
}

module.exports = CarouselImage;
