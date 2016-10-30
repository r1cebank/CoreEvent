/*
* This is the root component, it is used to register with AppRegistry
* Here the app will decide what root view type we will be using according to config
*/

/* @flow */
/* eslint-disable no-console */
/* global __DEV__ */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppState, BackAndroid, DeviceEventEmitter } from 'react-native';
import Reactotron from 'reactotron';
import { Actions as RouterActions } from 'react-native-router-flux';
import QuickActions from 'react-native-quick-actions';
import PushNotification from 'react-native-push-notification';


// The root view is a navigation component which define a default view
import Env from './env';
import App from './app.ios.js';
import styles from './resources/styles';
import { Store, Analytics, Tags, Actions } from './global/globalIncludes';

// Construct the root element
function setup() {
    /*
    * Initialize plugins only in production, raven messes with react's redbox
    */
    if (!__DEV__) {
        console.disableYellowBox = true;
    }
    Reactotron.connect({
        name: 'eventcore',
        enabled: __DEV__
    });

    Analytics.GA.setTrackerId(Env.UA_APPID);
    // Fire appstart event
    Analytics.GA.trackEvent(Tags.Category.APP_STATE, 'launch');

    PushNotification.configure({

        // (optional) Called when Token is generated (iOS and Android)
        onRegister: (token) => {
            debugger;
            Store.appStore.dispatch(Actions.Settings.setPushToken(token));
            console.log('TOKEN:', token);
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: (notification) => {
            console.log('NOTIFICATION:', notification);
        },

        senderID: Env.GCM,

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
        requestPermissions: false
    });

    // Root component
    class Root extends Component {

        componentWillMount() {
            BackAndroid.addEventListener('hardwareBackPress', () => {
                try {
                    // Handle Android back
                    RouterActions.pop();
                } catch (err) {
                    // Handle app exit
                }
            });
        }
        componentDidMount() {
            // Binding appstate change method
            AppState.addEventListener('change', this._handleAppStateChange);
            // Register quick action listener
            DeviceEventEmitter.addListener('quickActionShortcut', this._handleQuickAction);
            const action = QuickActions.popInitialAction();
            if (action) {
                this._handleQuickAction(action); // e.g. LinkingIOS.openURL(..)
            }
        }
        componentWillUnmount() {
            // Remove binding method
            AppState.removeEventListener('change', this._handleAppStateChange);
            DeviceEventEmitter.removeEventListener('quickActionShortcut', this._handleQuickAction);
        }
        _handleQuickAction(action) {
            if (action.type === 'Scan') {
                Actions.qrScanner();
            }
        }
        _handleAppStateChange(state) {
            // Handle app state change
            Analytics.GA.trackEvent(Tags.Category.APP_STATE, state);
        }
        render() {
            return (
                <Provider store={Store.appStore}>
                    <App style={styles.container} />
                </Provider>
            );
        }
    }
    return Root;
}

export default setup;
