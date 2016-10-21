/*
 *  This file defines the global includes in the application
 */

const globalIncludes = {
    get Views() { return require('./includes/views'); },
    get Scenes() { return require('./includes/scenes'); },
    get API() { return require('./includes/api'); },
    get Components() { return require('./includes/components'); },
    get Storage() { return require('./includes/storage'); },
    get Store() { return require('./includes/store'); },
    get Colors() { return require('./includes/colors'); },
    get Dimensions() { return require('./includes/dimensions'); },
    get Icons() { return require('./includes/icons'); },
    get Utils() { return require('./includes/utils'); },
    get Assets() { return require('./includes/assets'); },
    get Actions() { return require('./includes/actions'); },
    get Analytics() { return require('./includes/analytics'); },
    get Tags() { return require('./includes/analyticsTag'); },
    get Languages() { return require('./includes/languages'); },
    get Selectors() { return require('./includes/selectors'); }
};

module.exports = globalIncludes;
