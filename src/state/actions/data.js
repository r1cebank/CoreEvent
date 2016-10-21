/*
* This file include all the data actions
*/

import * as ActionType from './actionTypes';
import { Storage } from '../../global/globalIncludes';

export function fetchCarousel() {
    return async (dispatch) => {
        let data = await Storage.Carousel.fetch();
        data = JSON.parse(JSON.stringify(data));
        dispatch({ type: ActionType.CAROUSEL_FETCHED, data });
    };
}
