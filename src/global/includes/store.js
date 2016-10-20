/*
 *  This file defines the stores in the application
 */

/* eslint-disable global-require */

import { InitialAppState as initialState } from '../../state/initialState';
import configureStore from '../../state/configureStore';


export const appStore = configureStore(initialState);
