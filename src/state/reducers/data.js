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
        case ActionType.ADD_FAVORITE: {
            const newState = _.cloneDeep(state);
            const match = newState.favorites.filter((favorite) => {
                return (favorite === action.event.id);
            });
            if (!match.length) {
                newState.favorites.push(action.event.id);
            }
            return newState;
        }
        case ActionType.HIDE_EVENT: {
            const newState = _.cloneDeep(state);
            const match = newState.hidden.filter((hidden) => {
                return (hidden === action.event.id);
            });
            if (!match.length) {
                newState.hidden.push(action.event.id);
            }
            return newState;
        }
        case ActionType.REMOVE_FAVORITE: {
            const newState = _.cloneDeep(state);
            const newFavorite = newState.favorites.filter((favorite) => {
                return (favorite !== action.event.id);
            });
            newState.favorites = newFavorite;
            return newState;
        }
        case ActionType.REMOVE_HIDDEN: {
            const newState = _.cloneDeep(state);
            const newHidden = newState.hidden.filter((hidden) => {
                return (hidden !== action.event.id);
            });
            newState.hidden = newHidden;
            return newState;
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
        case ActionType.LOGOUT_USER: {
            return {
                ...state,
                pushMessages: [],
                drafts: {}
            };
        }
        case ActionType.ADD_DRAFT: {
            const newState = _.cloneDeep(state);
            newState.drafts[action.event.id] = action.event;
            return newState;
        }
        default:
            return state;
    }
}

export default reducer;
