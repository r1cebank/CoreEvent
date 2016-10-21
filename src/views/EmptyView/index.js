/* eslint-disable */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

class Test extends Component {
    render() {
        return (
            <View style={{ margin: 128 }}>
                <Text>This is EmptyView!</Text>
            </View>
        );
    }
}

class EmptyView extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="home"
                        component={Test}
                        title="home"
                        initial={true} />
                </Scene>
            </Router>
        );
    }
}

module.exports = EmptyView;
