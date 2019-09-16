'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeLikeTrackNotification
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change like track notification request
 * 
 * @alias module:ChangeLikeTrackNotification
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST};
}

/**
 * Notify the app of a change like track notification success
 * 
 * @alias module:ChangeLikeTrackNotification
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} likedTrack The updated like track notification status for the current user
 *
 * @returns {object}             Redux action with the type of CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS and the updated notification status
 */
export function success(
  likedTrack: boolean,
): Action {
  return {
    type: types.CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS,
    updates: {notify: {likedTrack}},
  };
}

/**
 * Notify the app of a change like track notification failure
 * 
 * @alias module:ChangeLikeTrackNotification
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change like track notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE,
    error,
  };
}