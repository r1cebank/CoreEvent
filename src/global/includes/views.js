/*
 *  This file is responsible to include all the views required for the app
 *  Each component must use their key defined in routes.js as their key in this
 *  file.
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

const views = {
    get HomeView() { return require('../../views/HomeView'); },
    get EmptyView() { return require('../../views/EmptyView'); }
};

module.exports = views;
