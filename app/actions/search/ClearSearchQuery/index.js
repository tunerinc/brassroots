'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ClearSearchQuery
 */

import * as types from '../types';
import {type Action} from '../../../reducers/search';

/**
 * Clears the search query
 * 
 * @alias module:ClearSearchQuery
 * @function clearSearchQuery
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CLEAR_SEARCH_QUERY
 */
export function clearSearchQuery(): Action {
  return {
    type: types.CLEAR_SEARCH_QUERY,
  };
}
