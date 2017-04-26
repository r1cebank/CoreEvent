/* global __DEV__ */

import { connect } from 'react-redux';
import Video from 'react-native-video';
import React, { Component } from 'react';
import QuickActions from 'react-native-quick-actions';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions as RouterActions } from 'react-native-router-flux';
import PopupDialog from 'react-native-popup-dialog';
import PushNotification from 'react-native-push-notification';
import { Kohana } from 'react-native-textinput-effects';

import {
    Colors,
    Assets,
    Icons,
    API,
    Store,
    Actions,
    Utils,
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
            resendEnabled: false,
            isVerifying: false,
            notice: {},
            phone: '',
            vcode: ''
        };
    }
    componentWillUnmount() {
        if (this.countDown) {
            this.countDown.removeInterval();
        }
    }
    showNotice = (notice) => {
        this.setState({
            showNotice: true,
            notice
        });
        this.popupDialog.openDialog();
    }
    verify = async () => {
        try {
            const response = await API.Cloud.run('login', {
                phoneNumber: this.state.phone,
                codeEntry: this.state.vcode
            });
            const user = await Storage.User.become(response);
            Store.appStore.dispatch(Actions.Settings
                .updateUser(user.toJSON()));
            PushNotification.requestPermissions();
            this.setShortcuts();
        } catch (e) {
            this.showNotice({
                icon: 'error',
                color: Colors.infraRed,
                header: Languages.t('error', this.props.locale),
                notice: Languages.t('incorrectCode', this.props.locale)
            });
        }
    }
    setShortcuts = () => {
        // Add few actions
        QuickActions.setShortcutItems([
            {
                type: 'Event', // Required
                subtitle: Languages.t('newEvent', this.props.locale),
                icon: 'Compose'
            },
            {
                type: 'Scan', // Required
                title: Languages.t('qrScanner', this.props.locale),
                icon: 'scan'
            }
        ]);
    }
    transitionToVerification = async () => {
        // Invoke cloud sendcode function
        await this.resend();
        // Transition to verification page, with phone number
    }
    resend = async () => {
        try {
            await API.Cloud.run('sendCode', { phoneNumber: this.state.phone });
            this.setState({
                resendEnabled: false,
                isVerifying: true
            });
            this.countDown.reset();
        } catch (e) {
            // TODO: handle error, send notice
            this.showNotice({
                icon: 'error',
                color: Colors.infraRed,
                header: Languages.t('error', this.props.locale),
                notice: Languages.t('codeSentFailed', this.props.locale)
            });
            return;
        }
    }
    countDownComplete = () => {
        this.setState({
            resendEnabled: true
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Video
                    source={Assets.signupVideo}
                    rate={1.0}
                    muted={true}
                    paused={false}
                    resizeMode="cover"
                    repeat={true}
                    playWhenInactive={false}
                    style={styles.video} />
                <View style={styles.innerContainer}>
                    <View style={styles.headerContainer}>
                        {(() => {
                            if (this.state.isVerifying) {
                                return (
                                    <View>
                                        <Text style={styles.header}>
                                            {Languages.t('inputVerify', this.props.locale)}
                                        </Text>
                                        <Text style={styles.phoneNumber}>
                                            {this.state.phone}
                                        </Text>
                                    </View>
                                );
                            }
                            return (
                                <Text style={styles.header}>
                                    {Languages.t('signup', this.props.locale)}
                                    /
                                    {Languages.t('login', this.props.locale)}
                                </Text>
                            );
                        })()}
                    </View>
                    <View style={styles.inputContainer}>
                        {(() => {
                            if (this.state.isVerifying) {
                                return (
                                    <Kohana
                                        style={{ backgroundColor: Colors.frontColor }}
                                        autoCapitalize="none"
                                        autoFocus={true}
                                        maxLength={4}
                                        label={Languages.t('vcode', this.props.locale)}
                                        onChangeText={(vcode) => this.setState({ vcode })}
                                        value={this.state.vcode}
                                        keyboardType="phone-pad"
                                        iconClass={Icons.MaterialIcons}
                                        iconName={'vpn-key'}
                                        iconColor={Colors.infraRed}
                                        labelStyle={{ color: Colors.infraRed }}
                                        inputStyle={{ color: Colors.infraRed }} />
                                );
                            }
                            return (
                                <Kohana
                                    style={{ backgroundColor: Colors.frontColor }}
                                    autoCapitalize="none"
                                    autoFocus={false}
                                    label={Languages.t('phoneNumber', this.props.locale)}
                                    onChangeText={(phone) => this.setState({ phone })}
                                    value={this.state.phone}
                                    keyboardType="numbers-and-punctuation"
                                    iconClass={Icons.MaterialIcons}
                                    iconName={'smartphone'}
                                    iconColor={Colors.infraRed}
                                    labelStyle={{ color: Colors.infraRed }}
                                    inputStyle={{ color: Colors.infraRed }} />
                            );
                        })()}
                        {(() => {
                            if (this.state.isVerifying) {
                                return (
                                    <View style={styles.countDownContainer}>
                                        <Components.CountDown
                                            ref={(c) => this.countDown = c}
                                            duration={60}
                                            onComplete={this.countDownComplete}
                                            label={
                                                Languages.t('secondsLater', this.props.locale)
                                            } />
                                        <TouchableOpacity
                                            onPress={
                                                this.state.resendEnabled ? this.resend : Utils.noop
                                            }>
                                            <Text
                                                style={
                                                    !this.state.resendEnabled && styles.disabled
                                                }>
                                                {Languages.t('resend', this.props.locale)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                            return null;
                        })()}
                    </View>
                    <View
                        style={[
                            styles.checkboxContainer,
                            this.state.isVerifying && styles.verifyContainer
                        ]}>
                        <Button
                            borderRadius={40}
                            disabled={false}
                            onPress={
                                this.state.isVerifying ?
                                this.verify :
                                this.transitionToVerification}
                            textStyle={styles.button}
                            backgroundColor={Colors.infraRed}
                            buttonStyle={{ marginBottom: 10 }}
                            title={
                                this.state.isVerifying ?
                                Languages.t('confirm', this.props.locale) :
                                Languages.t('getCode', this.props.locale)} />
                        <Button
                            borderRadius={40}
                            textStyle={styles.button}
                            onPress={RouterActions.pop}
                            backgroundColor={Colors.silverSand}
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
