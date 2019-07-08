'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetSearch
 */

import * as types from '../types';
import {type Action} from '../../../reducers/search';

/**
 * Resets the redux search state object
 * 
 * @alias module:ResetSearch
 * @function resetSearch
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_SEARCH
 */
export function resetSearch(): Action {
  return {
    type: types.RESET_SEARCH,
  };
}