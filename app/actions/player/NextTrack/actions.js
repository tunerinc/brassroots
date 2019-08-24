'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module NextTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a next track request
 * 
 * @alias module:NextTrack
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of NEXT_TRACK_REQUEST
 */
export function request(): Action {
  return {type: types.NEXT_TRACK_REQUEST};
}

/**
 * Notify the app of a next track success
 * 
 * @alias module:NextTrack
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} action.currentQueueID     The Brassroots id of the new current track
 * @param   {string} action.currentTrackID     The Spotify id of the new current track
 * @param   {string} [action.nextQueueID=null] The Brassroots id of the next track in user queue, if available
 * @param   {string} [action.nextTrackID=null] The Spotify id of the next track in user queue, if available
 * @param   {number} action.durationMS         The duration of the current track in milliseconds
 *
 * @return {object}                            Redux action with the type of NEXT_TRACK_SUCCESS, the queue ids of the tracks, and the duration of the new track in milliseconds
 */
export function success(
  currentQueueID: ?string = null,
  currentTrackID: string,
  durationMS: ?number = null,
  nextQueueID: ?string = null,
  nextTrackID: ?string = null,
  ): Action {
  return {
    type: types.NEXT_TRACK_SUCCESS,
    currentQueueID,
    currentTrackID,
    durationMS,
    nextQueueID,
    nextTrackID,
  };
}

/**
 * Notify the app of a next track failure
 * 
 * @alias module:NextTrack
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the next track failure
 *
 * @returns {object}       Redux action with the type of NEXT_TRACK_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.NEXT_TRACK_FAILURE,
    error,
  };
}
