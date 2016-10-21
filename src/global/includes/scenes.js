/*
 *  This file is responsible to include all the views required for the app
 *  Each component must use their key defined in routes.js as their key in this
 *  file.
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

const scenes = {
    get HomeScene() { return require('../../scenes/HomeScene'); }
};

module.exports = scenes;
