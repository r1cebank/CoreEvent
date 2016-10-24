/*
 *  ExpandableText element
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './resources/styles';

class ExpandableText extends Component {
    static propTypes = {
        children: React.PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            text: props.children,
            maximumCount: 100,
            viewMore: props.children.length < 100
        };
    }
    viewMore = () => {
        this.setState({
            viewMore: true
        });
    }
    render() {
        // TODO: Replace to TouchableOpacity when https://github.com/facebook/react-native/pull/8909 is merged
        return (
            <View {...this.props}>
                {(() => {
                    if (this.state.viewMore) {
                        return (
                            <Text>
                                {this.state.text}
                            </Text>
                        );
                    }
                    return (
                        <Text>
                            {this.state.text.slice(0, this.state.maximumCount)}...
                        </Text>
                    );
                })()}
                {(() => {
                    if (!this.state.viewMore) {
                        return (
                            <TouchableOpacity onPress={this.viewMore}>
                                <Text style={styles.linkStyle}>Read more</Text>
                            </TouchableOpacity>
                        );
                    }
                    return null;
                })()}

            </View>
        );
    }
}

module.exports = ExpandableText;
