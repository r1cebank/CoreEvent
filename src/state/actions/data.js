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
