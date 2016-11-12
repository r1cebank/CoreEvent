/*
* This file includes all the settings state reducers
*/

import * as ActionType from '../actions/actionTypes';

function reducer(state = {}, action) {
    switch (action.type) {
        case ActionType.SET_LANGUAGE: {
            return {
                ...state,
                locale: action.locale
            };
        }
        case ActionType.SELECT_TAB: {
            return {
                ...state,
                selectedTab: action.selectedTab
            };
        }
        case ActionType.SET_ENV: {
            return {
                ...state,
                env: action.env
            };
        }
        case ActionType.UPDATE_USER: {
            return {
                ...state,
                user: action.user
            };
        }
        case ActionType.UPDATE_LOCATION: {
            return {
                ...state,
                location: action.location
            };
        }
        case ActionType.LOGOUT_USER: {
            return {
                ...state,
                user: undefined,
                selectedTab: 'hot'
            };
        }
        case ActionType.SET_PUSH_TOKEN: {
            return {
                ...state,
                pushToken: action.token
            };
        }
        case ActionType.CONFIG_FETCHED: {
            return {
                ...state,
                config: action.config
            };
        }
        default:
            return state;
    }
}

export default reducer;
