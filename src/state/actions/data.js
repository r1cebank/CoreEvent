/*
* This file include all the data actions
*/

import * as ActionType from './actionTypes';
// import { Storage } from '../../global/globalIncludes';

export function updateCarousel(data) {
    return { type: ActionType.CAROUSEL_FETCHED, data: JSON.parse(JSON.stringify(data)) };
}
export function updateCategory(data) {
    return { type: ActionType.CATEGORY_FETCHED, data: JSON.parse(JSON.stringify(data)) };
}
export function addPushMessage(message) {
    return { type: ActionType.PUSH_RECEIVED, message };
}
export function addFavorite(event) {
    return { type: ActionType.ADD_FAVORITE, event };
}
export function hideEvent(event) {
    return { type: ActionType.HIDE_EVENT, event };
}
export function removeFavorite(event) {
    return { type: ActionType.REMOVE_FAVORITE, event };
}
export function removeHidden(event) {
    return { type: ActionType.REMOVE_HIDDEN, event };
}
export function addDraft(event) {
    return { type: ActionType.ADD_DRAFT, event };
}
