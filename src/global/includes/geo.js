/*
 *  This file defines the geolocation libs in the application
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */


const assets = {
    get Location() { return require('NativeModules').RNLocation; }, // eslint-disable-line
    get Geocoder() { return require('react-native-geocoder').default; }
};

module.exports = assets;
