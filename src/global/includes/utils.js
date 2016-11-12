/*
 *  This file defines the utilities in the application
 */

/* eslint-disable global-require */

const utils = {
    get noop() { return () => {}; },
    get placeSuggestions() { return require('../../utils/placeSuggestions'); },
    get updateLocation() { return require('../../utils/updateLocation'); }
};

module.exports = utils;
