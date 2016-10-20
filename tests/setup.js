/**
* We have to do this because of:
* https://phabricator.babeljs.io/T6726
*/
require('babel-register')({ ignore: false });

/* eslint-disable */
const mockery = require('mockery');
const View = require('react-native').View;

// mock localization
mockery.registerMock('react-native-i18n', {
    t: (key) => {
        return key;
    }
})
mockery.registerMock('react-native-google-analytics-bridge', {
    trackEvent: (category, eventName, data) => {
        return true;
    }
})
mockery.registerMock('reactotron-react-native', {
})


// Assets
mockery.registerMock('../assets/placeholder.png', 0)

// Injecting fetch packaged by RN
global.fetch = require('node-fetch');

// inject __DEV__
global.__DEV__ = true

// inject __TEST__
global.__TEST__ = true

// We enable mockery and leave it on.
mockery.enable()

// Silence mockery's warnings as we'll opt-in to mocks instead
mockery.warnOnUnregistered(false)
