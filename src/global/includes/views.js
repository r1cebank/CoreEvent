/*
 *  This file is responsible to include all the views required for the app
 *  Each component must use their key defined in routes.js as their key in this
 *  file.
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

const views = {
    get HomeView() { return require('../../views/HomeView'); },
    get EmptyView() { return require('../../views/EmptyView'); },
    get LoadingView() { return require('../../views/LoadingView'); },
    get CarouselView() { return require('../../views/CarouselView'); },
    get CategoryView() { return require('../../views/CategoryView'); },
    get CategoryChildView() { return require('../../views/CategoryChildView'); },
    get QRScannerView() { return require('../../views/QRScannerView'); },
    get EventListView() { return require('../../views/EventListView'); },
    get WelcomeView() { return require('../../views/WelcomeView'); },
    get PopupView() { return require('../../views/PopupView'); }
};

module.exports = views;
