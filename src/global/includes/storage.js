/*
 *  This file defines the storage classes in the application
 */

/* eslint-disable global-require */

const storages = {
    get Carousel() { return require('../../storage/carousel'); },
    get Config() { return require('../../storage/config'); }
};

module.exports = storages;
