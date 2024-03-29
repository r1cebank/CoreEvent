import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages } from '../../global/globalIncludes';

import styles from './resources/styles';

class MessagesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('messageLC', this.props.locale) });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                      />
                    }>
                </ScrollView>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(MessagesView);
