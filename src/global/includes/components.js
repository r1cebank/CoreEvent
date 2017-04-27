/*
 *  This file defines the components in the application
 */

/* eslint-disable global-require */

const components = {
    get ExpandableText() { return require('../../components/ExpandableText'); },
    get EventTile() { return require('../../components/EventTile'); },
    get MyEventTile() { return require('../../components/MyEventTile'); },
    get EmptyList() { return require('../../components/EmptyList'); },
    get Notice() { return require('../../components/Notice'); },
    get CategoryTile() { return require('../../components/CategoryTile'); },
    get Message() { return require('../../components/Message'); },
    get CountDown() { return require('../../components/CountDown'); },
    get CarouselImage() { return require('../../components/CarouselImage'); },
    get LinkButton() { return require('../../components/LinkButton'); }
};

module.exports = components;
