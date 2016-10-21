/* global __DEV__ */

import React, { Component } from 'react';
import Spinner from 'react-native-spinkit';
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
                <Spinner
                    color={Colors.spinnerColor}
                    size={Dimensions.spinnerSize}
                    type={(() => {
                        if (Platform.OS === 'ios') {
                            return 'Arc';
                        }
                        return 'ThreeBounce';
                    })()} />
                <Text style={styles.text}>{this.props.loadingText}</Text>
            </View>
        );
    }
}

module.exports = LoadingView;
