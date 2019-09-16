'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PreviousTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a previous track request
 * 
 * @alias module:PreviousTrack
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of PREVIOUS_TRACK_REQUEST
 */
export function request(): Action {
  return {
    type: types.PREVIOUS_TRACK_REQUEST,
  };
}

/**
 * Notify the app of a previous track success
 * 
 * @alias module:PreviousTrack
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} currentQueueID     The Brassroots id of the new current track
 * @param   {string} currentTrackID     The Spotify id of the new current track
 * @param   {number} durationMS         The duration of the previous track in milliseconds
 * @param   {string} [prevQueueID=null] The Brassroots id of the new previous track
 * @param   {string} [prevTrackID=null] The Spotify id of the new previous track
 *
 * @returns {object}                    Redux action with the type of PREVIOUS_TRACK_SUCCESS, the queue ids of the tracks, and the duration of the current track in milliseconds
 */
export function success(
  currentQueueID: string,
  currentTrackID: string,
  durationMS: number,
  prevQueueID: ?string = null,
  prevTrackID: ?string = null,
) {
  return {
    type: types.PREVIOUS_TRACK_SUCCESS,
    currentQueueID,
    currentTrackID,
    durationMS,
    prevQueueID,
    prevTrackID,
  };
}

/**
 * Notify the app of a previous track failure
 * 
 * @alias module:PreviousTrack
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the previous track failure
 *
 * @returns {object}       Redux action with the type of PREVIOUS_TRACK_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.PREVIOUS_TRACK_FAILURE,
    error,
  };
}