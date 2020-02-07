'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Resets the redux tracks state object
 * 
 * @alias module:ResetTracks
 * @function resetTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_TRACKS
 */
export function resetTracks(): Action {
  return {
    type: types.RESET_TRACKS,
  };
}