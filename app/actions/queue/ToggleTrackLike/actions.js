'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleTrackLike
 */

import * as types from '../types';
import {type Action} from '../../../reducers/queue';

/**
 * Notify the app of a toggle track like request
 * 
 * @alias module:ToggleTrackLike
 * @function toggleTrackLikeRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {string} queueID The queue id to request a toggle like on
 *
 * @return {object}         Redux action with the type of TOGGLE_TRACK_LIKE_REQUEST and the queueID to toggle like on
 */
export function toggleTrackLikeRequest(
  queueID: string,
): Action {
  return {
    type: types.TOGGLE_TRACK_LIKE_REQUEST,
    queueID,
  };
}

/**
 * Notify the app of a toggle track like success
 * 
 * @alias module:ToggleTrackLike
 * @function toggleTrackLikeSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {string} queueID The queue id of the track that was toggled
 *
 * @return {object} Redux action with the type of TOGGLE_TRACK_LIKE_SUCCESS and the track id the current user toggled like on
 */
export function toggleTrackLikeSuccess(
  queueID: string,
): Action {
  return {
    type: types.TOGGLE_TRACK_LIKE_SUCCESS,
    queueID,
  };
}

/**
 * Notify the app of a toggle track like failure
 * 
 * @alias module:ToggleTrackLike
 * @function toggleTrackLikeFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {string} queueID The queue id the toggle like failed on
 * @param  {Error}  error   The error which caused the toggle track like failure
 *
 * @return {object}         Redux action with the type of TOGGLE_TRACK_LIKE_FAILURE and the error which caused the failure on the queue track
 */
export function toggleTrackLikeFailure(
  queueID: string,
  error: Error,
): Action {
  return {
    type: types.TOGGLE_TRACK_LIKE_FAILURE,
    queueID,
    error,
  };
}