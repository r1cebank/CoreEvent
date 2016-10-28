/*
 *  This file defines the assets in the application
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */


const assets = {
    get placeholder() { return require('../assets/placeholder.png'); },
    get launchpad_bg() { return require('../assets/launchpad_bg.png'); },
    get bear() { return require('../assets/bear.png'); },
    get cloud() { return require('../assets/cloud.png'); },
    get cloud2() { return require('../assets/cloud2.png'); },
    get flame() { return require('../assets/flame.png'); },
    get release() { return require('../assets/release.png'); },
    get ship_bg() { return require('../assets/ship_bg.png'); },
    get ship() { return require('../assets/ship.png'); },
    get smoke() { return require('../assets/smoke.png'); }
};

module.exports = assets;
