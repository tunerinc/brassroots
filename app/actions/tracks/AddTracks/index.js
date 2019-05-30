'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddTracks
 */

import * as types from '../types';
import {
  type Track,
  type Action,
} from '../../../reducers/tracks';

/**
 * Adds tracks retrieved from Spotify
 * 
 * @alias module:AddTracks
 * @function addTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} tracks The current user's track objects retrieved from Spotify
 *
 * @returns {object}        Redux action with the type of ADD_TRACKS and the track objects to add
 */
export function addTracks(
  tracks: {+[id: string]: Track},
): Action {
  return {
    type: types.ADD_TRACKS,
    tracks,
  };
}
