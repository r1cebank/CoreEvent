/*
* This file includes all the settings state reducers
*/

import _ from 'lodash';
import * as ActionType from '../actions/actionTypes';

function reducer(state = {}, action) {
    switch (action.type) {
        case ActionType.CAROUSEL_FETCHED: {
            return {
                ...state,
                carousel: action.data
            };
        }
        case ActionType.CATEGORY_FETCHED: {
            return {
                ...state,
                category: action.data
            };
        }
        case ActionType.PUSH_RECEIVED: {
            const newState = _.cloneDeep(state);
            newState.pushMessages.push(action.message);
            return newState;
        }
        default:
            return state;
    }
}

export default reducer;
