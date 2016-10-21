/* global __DEV__ */

import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import styles from './resources/styles';
import { Colors, Dimensions } from '../../global/globalIncludes';

class LoadingView extends Component {
    static propTypes = {
        loadingText: React.PropTypes.string
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.loadingText}</Text>
            </View>
        );
    }
}

module.exports = LoadingView;
