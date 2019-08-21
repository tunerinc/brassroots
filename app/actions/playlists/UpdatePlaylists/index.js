'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdatePlaylists
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Updates any of the values in the playlists state
 * 
 * @function updatePlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the playlists state
 * 
 * @returns {object}         Redux action with the type of UPDATE_PLAYLISTS and the updates to make
 */
export function updatePlaylists(
  updates: State,
): Action {
  return {
    type: types.UPDATE_PLAYLISTS,
    updates,
  };
}