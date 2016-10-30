import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions as RouterActions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import DialogBox from 'react-native-dialogbox';

import { Languages, Store, Actions } from '../../global/globalIncludes';

import styles from './resources/styles';

class SettingsView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('settingsLC', this.props.locale) });
    }
    logout = () => {
        this.dialogbox.confirm({
            content: Languages.t('logoutConfirm', this.props.locale),
            ok: {
                callback: () => {
                    Store.appStore.dispatch(Actions.Settings
                        .logoutUser());
                }
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.logout}
                    title="Logout" />
                <DialogBox ref={(dialogbox) => this.dialogbox = dialogbox} />
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(SettingsView);
