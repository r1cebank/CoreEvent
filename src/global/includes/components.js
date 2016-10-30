/*
 *  This file defines the components in the application
 */

/* eslint-disable global-require */

const components = {
    get ExpandableText() { return require('../../components/ExpandableText'); },
    get EventTile() { return require('../../components/EventTile'); },
    get MyEventTile() { return require('../../components/MyEventTile'); },
    get Notice() { return require('../../components/Notice'); },
    get CarouselImage() { return require('../../components/CarouselImage'); }
};

module.exports = components;
