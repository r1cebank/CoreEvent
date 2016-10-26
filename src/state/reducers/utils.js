/*
 * This file includes all the basic app state reducers
 */

import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import * as ActionType from '../actions/actionTypes';

function reducer(state = {}, action) {
    switch (action.type) {
        case ActionType.APP_ERROR: {
            const newState = _.cloneDeep(state);
            newState.errors.push({
                error: action.error.message,
                data: action.data
            });
            return newState;
        }
        case ActionType.TOGGLE_MENU: {
            return {
                ...state,
                toggleMenu: !state.toggleMenu
            };
        }
        case REHYDRATE: {
            return {
                ...state,
                hydrationComplete: true
            };
        }
        default:
            return state;
    }
}

export default reducer;
