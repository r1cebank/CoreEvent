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
        case ActionType.SET_ENV: {
            return {
                ...state,
                env: action.env
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
