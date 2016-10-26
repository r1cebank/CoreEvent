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
import { Actions } from 'react-native-router-flux';

// The root view is a navigation component which define a default view
import Env from './env';
import App from './app';
import styles from './resources/styles';
import { Store, Analytics, Tags } from './global/globalIncludes';

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

    // Root component
    class Root extends Component {

        componentWillMount() {
            BackAndroid.addEventListener('hardwareBackPress', () => {
                try {
                    // Handle Android back
                    Actions.pop();
                } catch (err) {
                    // Handle app exit
                }
            });
        }
        componentDidMount() {
            // Binding appstate change method
            AppState.addEventListener('change', this._handleAppStateChange);
        }
        componentWillUnmount() {
            // Remove binding method
            AppState.removeEventListener('change', this._handleAppStateChange);
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
