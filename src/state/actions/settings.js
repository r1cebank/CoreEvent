/*
* This file include all the settings actions
*/

import * as ActionType from './actionTypes';
// import { Storage } from '../../global/globalIncludes';

export function setLanguage(locale) {
    return {
        type: ActionType.SET_LANGUAGE,
        locale
    };
}
export function setEnv(env) {
    return {
        type: ActionType.SET_ENV,
        env
    };
}
