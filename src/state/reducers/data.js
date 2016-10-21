/*
* This file includes all the settings state reducers
*/

import * as ActionType from '../actions/actionTypes';

function reducer(state = {}, action) {
    switch (action.type) {
        case ActionType.CAROUSEL_FETCHED: {
            return {
                ...state,
                carousel: action.data
            };
        }
        default:
            return state;
    }
}

export default reducer;
