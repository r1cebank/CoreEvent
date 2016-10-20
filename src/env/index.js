/*
 * Stored environment variables for the app
 */
 /* global __DEV__ */

let environment = {};

if (__DEV__) {
    environment = {
        UA_APPID: 'UA-86083449-1',
        DEBUG_PASSWORD: '3939',
        GCM: ''
    };
} else {
    environment = {
        UA_APPID: 'UA-86083449-1',
        DEBUG_PASSWORD: '3939',
        GCM: ''
    };
}
module.exports = environment;
