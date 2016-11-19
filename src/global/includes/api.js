/*
*  This file defines the defaults in the application
*/

/* eslint-disable global-require */

import Env from '../../env';

const Parse = require('parse/react-native');

Parse.initialize(Env.PARSE_APPID);
Parse.serverURL = Env.PARSE_URL;

const classes = {
    carousel: Parse.Object.extend('Carousel'),
    category: Parse.Object.extend('Category'),
    event: Parse.Object.extend('Event'),
    location: Parse.Object.extend('Location'),
    attendance: Parse.Object.extend('Attendance'),
    invitation: Parse.Object.extend('Invitation'),
    role: Parse.Object.extend('_Role')
};

const api = {
    get ParseReact() { return require('parse-react/react-native'); },
    get Parse() { return Parse; },
    get Classes() { return classes; },
    BaiduPlaces: 'https://api.map.baidu.com/place/v2/suggestion?query={input}&region=全国&output=json&ak={apiKey}'
};

module.exports = api;
