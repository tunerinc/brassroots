'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetArtists
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Resets the redux artists state object
 * 
 * @alias module:ResetArtists
 * @function resetArtists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_ARTISTS
 */
export function resetArtists(): Action {
  return {
    type: types.RESET_ARTISTS,
  };
};