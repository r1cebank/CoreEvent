/* global __DEV__ */

import { connect } from 'react-redux';
import Video from 'react-native-video';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Actions as RouterActions } from 'react-native-router-flux';
import PopupDialog from 'react-native-popup-dialog';
import PushNotification from 'react-native-push-notification';
import { Kohana } from 'react-native-textinput-effects';

import {
    Colors,
    Assets,
    Icons,
    Store,
    Actions,
    Storage,
    Components,
    Languages
} from '../../global/globalIncludes';

import styles from './resources/styles';

class LoginView extends Component {
    static propTypes = {
        loadingText: React.PropTypes.string,
        locale: React.PropTypes.string
    };
    constructor(props) {
        super(props);
        this.state = {
            notice: {},
            username: '',
            password: ''
        };
    }
    showNotice = (notice) => {
        this.setState({
            showNotice: true,
            notice
        });
        this.popupDialog.openDialog();
    }
    onChangeUsername = (username) => {
        this.setState({ username });
    }
    onChangePassword = (password) => {
        this.setState({ password });
    }
    login = async () => {
        if (!this.state.username.length) {
            this.showNotice({
                icon: 'warning',
                color: Colors.saffron,
                header: Languages.t('warning', this.props.locale),
                notice: Languages.t('noUsername', this.props.locale)
            });
            return;
        } else if (!this.state.password.length) {
            this.showNotice({
                icon: 'warning',
                color: Colors.saffron,
                header: Languages.t('warning', this.props.locale),
                notice: Languages.t('noPassword', this.props.locale)
            });
            return;
        }
        try {
            const user = await Storage.User.login(this.state.username, this.state.password);
            Store.appStore.dispatch(Actions.Settings
                .updateUser(user.toJSON()));
            PushNotification.requestPermissions();
        } catch (e) {
            if (e.code === 101) {
                this.showNotice({
                    icon: 'error',
                    color: Colors.infraRed,
                    header: Languages.t('error', this.props.locale),
                    notice: Languages.t('usernameError', this.props.locale)
                });
                return;
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Video
                    source={Assets.loginVideo}
                    rate={1.0}
                    muted={true}
                    paused={false}
                    resizeMode="cover"
                    repeat={true}
                    playWhenInactive={false}
                    style={styles.video} />
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>
                            {Languages.t('login', this.props.locale)}
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Kohana
                            style={{ backgroundColor: Colors.secondary }}
                            autoCapitalize="none"
                            label={Languages.t('username', this.props.locale)}
                            onChangeText={this.onChangeUsername}
                            value={this.state.username}
                            iconClass={Icons.MaterialIcons}
                            iconName={'account-circle'}
                            iconColor={Colors.green}
                            labelStyle={{ color: Colors.japaneseIndigo }}
                            inputStyle={{ color: Colors.japaneseIndigo }} />
                        <Kohana
                            style={{ backgroundColor: Colors.secondary }}
                            autoCapitalize="none"
                            label={Languages.t('password', this.props.locale)}
                            onChangeText={this.onChangePassword}
                            value={this.state.password}
                            secureTextEntry={true}
                            iconClass={Icons.MaterialIcons}
                            iconName={'lock'}
                            iconColor={Colors.green}
                            labelStyle={{ color: Colors.japaneseIndigo }}
                            inputStyle={{ color: Colors.japaneseIndigo }} />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Button
                            borderRadius={40}
                            disabled={false}
                            onPress={this.login}
                            textStyle={styles.button}
                            backgroundColor={Colors.green}
                            buttonStyle={{ marginBottom: 10 }}
                            title={Languages.t('login', this.props.locale)} />
                        <Button
                            borderRadius={40}
                            textStyle={styles.button}
                            onPress={RouterActions.pop}
                            backgroundColor={Colors.grey}
                            title={Languages.t('back', this.props.locale)} />
                    </View>
                </View>
                <PopupDialog
                    width={0.8}
                    height={200}
                    open={this.state.showNotice}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                    <Components.Notice
                        color={this.state.notice.color}
                        icon={this.state.notice.icon}
                        header={this.state.notice.header}
                        notice={this.state.notice.notice} />
                </PopupDialog>
            </View>
        );
    }
}

function select(store) {
    return {
        locale: store.settings.locale
    };
}

module.exports = connect(select)(LoginView);
