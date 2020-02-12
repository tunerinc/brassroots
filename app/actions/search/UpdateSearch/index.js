'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateSearch
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/search';

/**
 * Updates any of the values in the search state
 * 
 * @function updateSearch
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates The updates to make to the state
 * 
 * @returns {object}         Redux action with the type of UPDATE_SEARCH and the updates to make
 */
export function updateSearch(
  updates: State,
): Action {
  return {
    type: types.UPDATE_SEARCH,
    updates,
  };
}