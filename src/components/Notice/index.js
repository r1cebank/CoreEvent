/*
 *  CarouselImage element
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

// import { Colors } from '../../global/globalIncludes';

import styles from './resources/styles';

class Notice extends Component {
    static propTypes = {
        header: React.PropTypes.string,
        notice: React.PropTypes.string,
        icon: React.PropTypes.string,
        color: React.PropTypes.string
    }
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    reverse
                    name={this.props.icon}
                    color={this.props.color} />
                <Text style={styles.header}>
                    {this.props.header}
                </Text>
                <Text style={styles.info}>
                    {this.props.notice}
                </Text>
            </View>
        );
    }
}

module.exports = Notice;
