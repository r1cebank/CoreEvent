/*
 *  ExpandableText element
 */

import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

// import { Colors, Languages } from '../../global/globalIncludes';
import styles from './resources/styles';

class CategoryTile extends Component {
    static propTypes = {
        index: React.PropTypes.number,
        onPress: React.PropTypes.func,
        color: React.PropTypes.string,
        name: React.PropTypes.string
    }
    render() {
        return (
            <TouchableOpacity
                style={[
                    this.props.index % 2 ? styles.rightItem : styles.leftItem,
                    styles.categoryItem,
                    { backgroundColor: this.props.color }
                ]}
                onPress={this.props.onPress}>
                <Text style={styles.categoryItemText}>
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        );
    }
}

module.exports = CategoryTile;
