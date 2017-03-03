import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-switch';
import DialogBox from 'react-native-dialogbox';
import QuickActions from 'react-native-quick-actions';
import { Actions as RouterActions } from 'react-native-router-flux';
import { List, ListItem, Button } from 'react-native-elements';


import { Storage, Languages, Store, Colors, Actions } from '../../global/globalIncludes';

import styles from './resources/styles';

class SettingsView extends Component {
    static propTypes = {
        locale: React.PropTypes.string,
        user: React.PropTypes.object,
        config: React.PropTypes.object
    }
    componentWillMount() {
        RouterActions.refresh({ title: Languages.t('settingsLC', this.props.locale) });
    }
    logout = () => {
        this.dialogbox.confirm({
            content: Languages.t('logoutConfirm', this.props.locale),
            ok: {
                text: Languages.t('confirm', this.props.locale),
                callback: () => {
                    Store.appStore.dispatch(Actions.Settings
                        .logoutUser());
                    QuickActions.clearShortcutItems();
                }
            },
            cancel: {
                text: Languages.t('cancel', this.props.locale)
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
    updateUser = (propName, value) => {
        Storage.User.updateFlag(propName, value);
        Store.appStore.dispatch(Actions.Settings
            .fetchUserUpdate());
    }
    renderNotificationOptions = () => {
        return (
            <View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>
                        {Languages.t('showAttendingNotification', this.props.locale)}
                    </Text>
                    <Switch
                        value={this.props.user.attendNotification}
                        onValueChange={(val) => this.updateUser('attendNotification', val)}
                        disabled={false}
                        activeText={Languages.t('on', this.props.locale)}
                        inActiveText={Languages.t('off', this.props.locale)}
                        backgroundActive={Colors.green}
                        backgroundInactive={Colors.infraRed}
                        circleActiveColor={Colors.frontColor}
                        circleInActiveColor={Colors.frontColor}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>
                        {Languages.t('showInviteNotification', this.props.locale)}
                    </Text>
                    <Switch
                        value={this.props.user.inviteNotification}
                        onValueChange={(val) => this.updateUser('inviteNotification', val)}
                        disabled={false}
                        activeText={Languages.t('on', this.props.locale)}
                        inActiveText={Languages.t('off', this.props.locale)}
                        backgroundActive={Colors.green}
                        backgroundInactive={Colors.infraRed}
                        circleActiveColor={Colors.frontColor}
                        circleInActiveColor={Colors.frontColor}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>
                        {Languages.t('showCancelNotification', this.props.locale)}
                    </Text>
                    <Switch
                        value={this.props.user.cancelNotification}
                        onValueChange={(val) => this.updateUser('cancelNotification', val)}
                        disabled={false}
                        activeText={Languages.t('on', this.props.locale)}
                        inActiveText={Languages.t('off', this.props.locale)}
                        backgroundActive={Colors.green}
                        backgroundInactive={Colors.infraRed}
                        circleActiveColor={Colors.frontColor}
                        circleInActiveColor={Colors.frontColor}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>
                        {Languages.t('showPromoNotification', this.props.locale)}
                    </Text>
                    <Switch
                        value={this.props.user.promoNotification}
                        onValueChange={(val) => this.updateUser('promoNotification', val)}
                        disabled={false}
                        activeText={Languages.t('on', this.props.locale)}
                        inActiveText={Languages.t('off', this.props.locale)}
                        backgroundActive={Colors.green}
                        backgroundInactive={Colors.infraRed}
                        circleActiveColor={Colors.frontColor}
                        circleInActiveColor={Colors.frontColor}
                    />
                </View>
            </View>
        );
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
                    {(() => {
                        if (this.props.config.attributes.show_push_settings) {
                            return (
                                <View style={{ padding: 20 }}>
                                    <Text style={{ paddingBottom: 10, fontWeight: '700', fontSize: 20, color: Colors.grey, textAlign: 'center' }}>
                                        {Languages.t('notificationSettings', this.props.locale)}
                                    </Text>
                                    {this.renderNotificationOptions()}
                                </View>
                            );
                        }
                        return null;
                    })()}
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
        user: store.settings.user,
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(SettingsView);
