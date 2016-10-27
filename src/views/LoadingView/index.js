/* global __DEV__ */

import React, { Component } from 'react';
import Spinner from 'react-native-spinkit';
import { View, Text } from 'react-native';

import styles from './resources/styles';
import { Colors, Dimensions } from '../../global/globalIncludes';

class LoadingView extends Component {
    static propTypes = {
        loadingText: React.PropTypes.string
    };
    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    color={Colors.grey}
                    type="ChasingDots" />
                <Text style={styles.text}>{this.props.loadingText}</Text>
            </View>
        );
    }
}

module.exports = LoadingView;
