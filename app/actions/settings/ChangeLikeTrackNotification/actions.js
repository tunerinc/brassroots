'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeLikeTrackNotification
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a change like track notification request
 * 
 * @alias module:ChangeLikeTrackNotification
 * @function changeLikeTrackNotificationRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST
 */
export function changeLikeTrackNotificationRequest(): Action {
  return {
    type: types.CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST,
  };
}

/**
 * Notify the app of a change like track notification success
 * 
 * @alias module:ChangeLikeTrackNotification
 * @function changeLikeTrackNotificationSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} status The updated like track notification status for the current user
 *
 * @returns {object}         Redux action with the type of CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS and the updated notification status
 */
export function changeLikeTrackNotificationSuccess(
  status: boolean,
): Action {
  return {
    type: types.CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change like track notification failure
 * 
 * @alias module:ChangeLikeTrackNotification
 * @function changeLikeTrackNotificationFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change like track notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function changeLikeTrackNotificationFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE,
    error,
  };
}