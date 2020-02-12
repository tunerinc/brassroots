'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateAlbums
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/albums';

/**
 * Updates any of the values in the albums state
 * 
 * @function updateAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the albums state
 * 
 * @returns {object}         Redux action with the type of UPDATE_ALBUMS and the updates to make
 */
export function updateAlbums(
  updates: State,
): Action {
  return {
    type: types.UPDATE_ALBUMS,
    updates,
  };
}