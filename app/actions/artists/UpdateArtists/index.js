'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateArtists
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/artists';

/**
 * Updates any of the values in the artists state
 * 
 * @function updateArtists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the artists state
 * 
 * @returns {object}         Redux action with the type of UPDATE_ARTISTS and the updates to make
 */
export function updateArtists(
  updates: State,
): Action {
  return {
    type: types.UPDATE_ARTISTS,
    updates,
  };
}