/*
 *  Restaurant tile element
 */

/* global __TEST__ */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './resources/styles';

class CountDown extends Component {
    static propTypes = {
        label: React.PropTypes.string,
        onComplete: React.PropTypes.func,
        duration: React.PropTypes.number.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
        this.removeInterval();
    }
    componentWillUnmount = () => {
        this.removeInterval();
    }
    removeInterval = () => {
        clearInterval(this.interval);
    }
    reset = () => {
        this.state = {
            remaining: this.props.duration
        };
        this.interval = setInterval(() => {
            const current = this.state.remaining - 1;
            this.setState({
                remaining: current,
                show: true
            });
            if (!current) {
                clearInterval(this.interval);
                this.setState({
                    show: false
                });
                if (typeof this.props.onComplete === 'function') {
                    this.props.onComplete();
                }
            }
        }, 1000);
    }
    render() {
        if (this.state.show) {
            return (
                <View style={styles.container}>
                    <Text>
                        {this.state.remaining} {this.props.label}
                    </Text>
                </View>
            );
        }
        return null;
    }
}

module.exports = CountDown;
