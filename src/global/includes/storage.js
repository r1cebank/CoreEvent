/*
 *  This file defines the storage classes in the application
 */

/* eslint-disable global-require */

const storages = {
    get Carousel() { return require('../../storage/carousel'); },
    get Config() { return require('../../storage/config'); },
    get Category() { return require('../../storage/category'); },
    get Event() { return require('../../storage/event'); },
    get Attendance() { return require('../../storage/attendance'); },
    get Role() { return require('../../storage/role'); },
    get Invitation() { return require('../../storage/invitation'); },
    get Report() { return require('../../storage/report'); },
    get User() { return require('../../storage/user'); }
};

module.exports = storages;
