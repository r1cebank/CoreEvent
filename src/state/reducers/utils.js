/*
 * This file includes all the basic app state reducers
 */

import _ from 'lodash';
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
        default:
            return state;
    }
}

export default reducer;
