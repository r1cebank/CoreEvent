/*
 *  This file defines the components in the application
 */

/* eslint-disable global-require */

const components = {
    get ExpandableText() { return require('../../components/ExpandableText'); },
    get EventTile() { return require('../../components/EventTile'); }
};

module.exports = components;
