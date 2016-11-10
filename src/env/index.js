/*
 * Stored environment variables for the app
 */
 /* global __DEV__ */

let environment = {};

if (__DEV__) {
    environment = {
        UA_APPID: 'UA-86083449-1',
        DEBUG_PASSWORD: '3939',
        PARSE_APPID: 'GuideFree',
        PARSE_URL: 'https://parse.agreatstartup.com/parse',
        GCM: '',
        BAIDU_APIKEY: 'Ce87e1k6PGvXOaaaRcPj5SOwI5uvX2qs'
    };
} else {
    environment = {
        UA_APPID: 'UA-86083449-1',
        DEBUG_PASSWORD: '3939',
        PARSE_APPID: 'GuideFree',
        PARSE_URL: 'https://parse.agreatstartup.com/parse',
        GCM: '',
        BAIDU_APIKEY: 'Ce87e1k6PGvXOaaaRcPj5SOwI5uvX2qs'
    };
}
module.exports = environment;
