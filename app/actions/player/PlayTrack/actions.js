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
 * @function playTrackRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @return {object} Redux action with the type of PLAY_TRACK_REQUEST
 */
export function playTrackRequest(): Action {
  return {
    type: types.PLAY_TRACK_REQUEST,
  };
}

/**
 * Notify the app of a play track success
 * 
 * @alias module:PlayTrack
 * @function playTrackSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string} currentQueueID The queue id of the new track playing
 * @param  {string} currentTrackID The Spotify id of the new track playing
 * @param  {number} durationMS     The duration of the track in milliseconds
 *
 * @return {object}                Redux action with the type of PLAY_TRACK_SUCCESS and the queue id of the new track playing
 */
export function playTrackSuccess(
  currentQueueID: ?string,
  currentTrackID: string,
  durationMS: number,
): Action {
  return {
    type: types.PLAY_TRACK_SUCCESS,
    currentQueueID,
    currentTrackID,
    durationMS,
  };
}

/**
 * Notify the app of a play track failure
 * 
 * @alias module:PlayTrack
 * @function playTrackFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the play track failure
 *
 * @return {object}       Redux action with the type of PLAY_TRACK_FAILURE and the error which caused the failure
 */
export function playTrackFailure(
  error: Error,
): Action {
  return {
    type: types.PLAY_TRACK_FAILURE,
    error,
  };
}