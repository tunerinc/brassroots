'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetPlaylists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Resets the redux playlists state object
 * 
 * @alias module:ResetPlaylits
 * @function resetPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_PLAYLISTS
 */
export function resetPlaylists(): Action {
  return {
    type: types.RESET_PLAYLISTS,
  };
}