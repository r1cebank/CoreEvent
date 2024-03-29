/*
 * This file include all the necessary procedures we need to do when we create
 * our state object for the app, a bug in this file will result in massive
 * inconsistencies across the entire app. Please do not edit this file without
 * my knowledge
 */
/* @flow */
/* global __DEV__ */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import devTools from 'remote-redux-devtools';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
// import Reactotron from 'reactotron';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import utilReducer from './reducers/utils';
import settingsReducer from './reducers/settings';
import dataReducer from './reducers/data';

const loggerMiddleware = createLogger();
// const reactotronEnhancer = createReactotronEnhancer(Reactotron);

const createStoreWithMiddleware = __DEV__ ? applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
    // Reactotron.reduxMiddleware
)(createStore) : applyMiddleware(
    thunkMiddleware
)(createStore);

const rootReducer = combineReducers({
    // every modules reducer should be define here
    data: dataReducer,
    utils: utilReducer,
    settings: settingsReducer
});

const configureStore = function(initialState) {
    let enhancer = undefined;
    if (__DEV__) {
        enhancer = compose(autoRehydrate(), devTools());
    } else {
        enhancer = compose(autoRehydrate());
    }
    const store = createStoreWithMiddleware(rootReducer, initialState, enhancer);
    persistStore(store, {
        storage: AsyncStorage,
        blacklist: [
            'utils'
        ]
    });
    // if (__DEV__) {
    //     Reactotron.addReduxStore(store);
    // }
    return store;
};

export default configureStore;
