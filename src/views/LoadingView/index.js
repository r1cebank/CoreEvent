/* global __DEV__ */

import React, { Component } from 'react';
import Spinner from 'react-native-spinkit';
import { View, Text } from 'react-native';

import styles from './resources/styles';
import { Colors } from '../../global/globalIncludes';

class LoadingView extends Component {
    static propTypes = {
        loadingText: React.PropTypes.string
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Spinner
                        size={40}
                        color={Colors.infraRed}
                        type="ChasingDots" />
                    {(() => {
                        if (this.props.loadingText) {
                            return <Text style={styles.text}>{this.props.loadingText}</Text>;
                        }
                        return null;
                    })()}
                </View>
            </View>
        );
    }
}

module.exports = LoadingView;
