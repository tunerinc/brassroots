'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateTracks
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Updates any of the values in the tracks state
 * 
 * @function updateTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the tracks state
 * 
 * @returns {object}         Redux action with the type of UPDATE_TRACKS and the updates to make
 */
export function updateTracks(
  updates: State,
): Action {
  return {
    type: types.UPDATE_TRACKS,
    updates,
  };
}