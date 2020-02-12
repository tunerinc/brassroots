'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetAlbums
 */

import * as types from '../types';
import {type Action} from '../../../reducers/albums';

/**
 * Resets the redux albums state object
 * 
 * @alias module:ResetAlbums
 * @function resetAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_ALBUMS
 */
export function resetAlbums(): Action {
  return {
    type: types.RESET_ALBUMS,
  };
};