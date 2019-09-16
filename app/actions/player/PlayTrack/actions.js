'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PlayTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a play track request
 * 
 * @alias module:PlayTrack
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of PLAY_TRACK_REQUEST
 */
export function request(): Action {
  return {type: types.PLAY_TRACK_REQUEST};
}

/**
 * Notify the app of a play track success
 * 
 * @alias module:PlayTrack
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string} currentQueueID     The queue id of the new track playing
 * @param  {string} currentTrackID     The Spotify id of the new track playing
 * @param  {number} durationMS         The duration of the track in milliseconds
 * @param  {string} [prevQueueID=null] The queue id of the previous track
 * @param  {string} [prevTrackID=null] The Spotify id of the previous track
 *
 * @return {object}                    Redux action with the type of PLAY_TRACK_SUCCESS and the queue id of the new track playing
 */
export function success(
  currentQueueID: ?string,
  currentTrackID: string,
  durationMS: number,
  prevQueueID?: ?string = null,
  prevTrackID?: ?string = null,
): Action {
  return {
    type: types.PLAY_TRACK_SUCCESS,
    currentQueueID,
    currentTrackID,
    durationMS,
    prevQueueID,
    prevTrackID,
  };
}

/**
 * Notify the app of a play track failure
 * 
 * @alias module:PlayTrack
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the play track failure
 *
 * @return {object}       Redux action with the type of PLAY_TRACK_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.PLAY_TRACK_FAILURE,
    error,
  };
}