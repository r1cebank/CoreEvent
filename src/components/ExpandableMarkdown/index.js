/*
 *  Restaurant tile element
 */

import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class ExpandableMarkdown extends Component {
    static propTypes = {
        children: React.PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            text: props.children,
            maximumCount: 100,
            viewMore: false
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
                <Text>
                    {this.state.text.slice(0, this.state.viewMore ?
                        this.state.text.length : this.state.maximumCount)}
                </Text>
                {(() => {
                    if (!this.state.viewMore) {
                        return (
                            <TouchableOpacity onPress={this.viewMore}>
                                <Text>Read more</Text>
                            </TouchableOpacity>
                        );
                    }
                    return null;
                })()}

            </View>
        );
    }
}

module.exports = ExpandableMarkdown;
