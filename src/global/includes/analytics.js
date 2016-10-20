/*
 *  This file includes analytics utilities in the application
 */

/* eslint-disable global-require */

const analytics = {
    get GA() { return require('react-native-google-analytics-bridge'); },
    GAAction: (cat, action, opt = {}) => { analytics.GA.trackEvent(cat, action, opt); }
};

module.exports = analytics;
