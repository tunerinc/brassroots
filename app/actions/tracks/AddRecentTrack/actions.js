'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddRecentTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a add recent track request
 * 
 * @alias module:AddRecentTrack
 * @function addRecentTrackRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of ADD_RECENT_TRACK_REQUEST
 */
export function addRecentTrackRequest(): Action {
  return {
    type: types.ADD_RECENT_TRACK_REQUEST,
  };
};

/**
 * Notify the app of a add recent track success
 * 
 * @alias module:AddRecentTrack
 * @function addRecentTrackSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object}         Redux action with the type of ADD_RECENT_TRACK_SUCCESS
 */
export function addRecentTrackSuccess(): Action {
  return {
    type: types.ADD_RECENT_TRACK_SUCCESS,
  };
}

/**
 * Notify the app of a add recent track failure
 * 
 * @alias module:AddRecentTrack
 * @function addRecentTrackFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the add recent track failure
 * 
 * @return {object}       Redux action with the type of ADD_RECENT_TRACK_FAILURE and the error which caused the failure
 */
export function addRecentTrackFailure(
  error: Error,
): Action {
  return {
    type: types.ADD_RECENT_TRACK_FAILURE,
    error,
  };
}