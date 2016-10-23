import React, { Component } from 'react';
import { View, Text } from 'react-native';

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
