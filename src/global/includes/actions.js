/*
 *  This file includes the all actions in the application
 */

/* eslint-disable global-require */

const defaults = {
    get Data() { return require('../../state/actions/data'); },
    get Settings() { return require('../../state/actions/settings'); },
    get Utils() { return require('../../state/actions/utils'); }
};

module.exports = defaults;
