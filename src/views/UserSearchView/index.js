import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, ScrollView, ListView } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';

import { Languages, Colors, Storage, Utils } from '../../global/globalIncludes';

import styles from './resources/styles';

class UserSearchView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        event: React.PropTypes.object
    }
    async componentWillMount() {
        RouterActions.refresh({ title: Languages.t('inviteUser', this.props.locale) });
    }
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(UserSearchView);
