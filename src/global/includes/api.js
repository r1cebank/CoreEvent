/*
*  This file defines the defaults in the application
*/

/* eslint-disable global-require */

import Env from '../../env';

const Parse = require('parse/react-native');

Parse.initialize(Env.PARSE_APPID);
Parse.serverURL = Env.PARSE_URL;

const classes = {
    carousel: Parse.Object.extend('Carousel')
};

const api = {
    get ParseReact() { return require('parse-react/react-native'); },
    get Parse() { return Parse; },
    get Classes() { return classes; }
};

module.exports = api;
