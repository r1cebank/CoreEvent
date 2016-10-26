/*
* This file include all the util actions
*/

import * as ActionType from './actionTypes';

export function appError(error, errorState, data) {
    return {
        type: ActionType.APP_ERROR,
        error,
        errorState,
        data
    };
}
export function toggleMenu() {
    return {
        type: ActionType.TOGGLE_MENU
    };
}
