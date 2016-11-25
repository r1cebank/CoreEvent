/*
 *  ExpandableText element
 */

import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { Text, View } from 'react-native';

import { Colors, Languages } from '../../global/globalIncludes';
import styles from './resources/styles';

class MyEventTile extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        onPressAccept: React.PropTypes.func,
        onPressReject: React.PropTypes.func,
        data: React.PropTypes.object
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.message}>
                        {Languages.t('invitationFrom', this.props.locale)
                            .replace('{0}', this.props.data.event.get('name'))}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Icon
                        color={Colors.primary}
                        name="check"
                        onPress={this.props.onPressAccept}
                        containerStyle={{ marginRight: 30 }} />
                    <Icon
                        color={Colors.infraRed}
                        name="close"
                        onPress={this.props.onPressReject}
                        containerStyle={{ marginRight: 0 }} />
                </View>
            </View>
        );
    }
}

module.exports = MyEventTile;
