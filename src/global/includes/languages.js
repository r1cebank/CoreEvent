/*
*  This file defines the defaults in the application
*/

/* eslint-disable global-require */

const I18n = require('react-native-i18n');
// Enable fallback for specifie language code
I18n.fallbacks = true;

const language = {
    get Translator() { return I18n; },
    t: (key, locale) => {
        return I18n.t(key, {
            locale
        });
    }
};

// Load the dictonary
I18n.translations = require('../../resources/dictionary.json');

module.exports = language;
