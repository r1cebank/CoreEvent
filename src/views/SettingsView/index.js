import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import DialogBox from 'react-native-dialogbox';
import QuickActions from 'react-native-quick-actions';
import { Actions as RouterActions } from 'react-native-router-flux';
import { List, ListItem, Button } from 'react-native-elements';


import { Languages, Store, Colors, Actions } from '../../global/globalIncludes';

import styles from './resources/styles';

class SettingsView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        config: React.PropTypes.object
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
                    QuickActions.clearShortcutItems();
                }
            }
        });
    }
    renderLanguages = () => {
        if (this.props.config.attributes.show_languages) {
            return (
                <ListItem
                    wrapperStyle={{ padding: 5 }}
                    title={Languages.t('language', this.props.locale)}
                    titleStyle={styles.titleStyle}
                    chevronColor={Colors.infraRed}
                    onPress={RouterActions.languages}
                    leftIcon={{ name: 'translate', style: styles.iconStyle }}
                />
            );
        }
        return null;
    }
    render() {
        return (
            <View style={styles.container}>
                <List containerStyle={styles.listContainer}>
                    <ListItem
                        wrapperStyle={{ padding: 5 }}
                        title={Languages.t('hiddenEvents', this.props.locale)}
                        titleStyle={styles.titleStyle}
                        chevronColor={Colors.infraRed}
                        onPress={RouterActions.myHidden}
                        leftIcon={{ name: 'remove-circle', style: styles.iconStyle }}
                    />
                    {this.renderLanguages()}
                </List>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.logout}
                        backgroundColor={Colors.infraRed}
                        buttonStyle={{ borderRadius: 40 }}
                        title={Languages.t('logout', this.props.locale)} />
                </View>
                <DialogBox ref={(dialogbox) => this.dialogbox = dialogbox} />
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(SettingsView);
