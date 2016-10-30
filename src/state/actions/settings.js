/*
* This file include all the settings actions
*/

import * as ActionType from './actionTypes';
import { Storage } from '../../global/globalIncludes';

export function setLanguage(locale) {
    return {
        type: ActionType.SET_LANGUAGE,
        locale
    };
}
export function updateConfig(config) {
    return {
        type: ActionType.CONFIG_FETCHED,
        config
    };
}
export function updateUser(user) {
    return {
        type: ActionType.UPDATE_USER,
        user
    };
}
export function logoutUser() {
    return async (dispatch) => {
        await Storage.User.logout();
        dispatch({ type: ActionType.LOGOUT_USER });
    };
}
export function setEnv(env) {
    return {
        type: ActionType.SET_ENV,
        env
    };
}
