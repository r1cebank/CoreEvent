/* eslint-disable */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

class EmptyView extends Component {
    render() {
        return (
            <View style={{ margin: 128 }}>
                <Text>This is EmptyView!</Text>
            </View>
        );
    }
}

module.exports = EmptyView;
