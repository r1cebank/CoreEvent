/*
*  EmptyList element
*/

import React, { Component } from 'react';
import { Icon, Button } from 'react-native-elements';
import { Text, View } from 'react-native';

import { Colors } from '../../global/globalIncludes';
import styles from './resources/styles';

class EmptyList extends Component {
    static propTypes = {
        index: React.PropTypes.number,
        onPress: React.PropTypes.func,
        message: React.PropTypes.string,
        buttonText: React.PropTypes.string
    }
    render() {
        return (
            <View style={{ justifyContent: 'center' }}>
                <Icon
                    size={40}
                    color={Colors.infraRed}
                    name="sentiment-neutral" />
                <Text style={styles.message}>
                    {this.props.message}
                </Text>
                <Button
                    raised
                    onPress={this.props.onPress}
                    backgroundColor={Colors.infraRed}
                    buttonStyle={{ borderRadius: 40 }}
                    title={this.props.buttonText} />
            </View>
        );
    }
}

module.exports = EmptyList;
