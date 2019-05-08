'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeNewFollowerNotification
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a change new follower notification request
 * 
 * @alias module:ChangeNewFollowerNotification
 * @function changeNewFollowerNotificationRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_NEW_FOLLOWER_NOTIFICATION_REQUEST
 */
export function changeNewFollowerNotificationRequest(): Action {
  return {
    type: types.CHANGE_NEW_FOLLOWER_NOTIFICATION_REQUEST,
  };
}

/**
 * Notify the app of a change new follower notification success
 * 
 * @alias module:ChangeNewFollowerNotification
 * @function changeNewFollowerNotificationSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} status The updated new follower notification status for the current user
 *
 * @returns {object}         Redux action with the type of CHANGE_NEW_FOLLOWER_NOTIFICATION_SUCCESS and the updated notification status
 */
export function changeNewFollowerNotificationSuccess(
  status: boolean,
): Action {
  return {
    type: types.CHANGE_NEW_FOLLOWER_NOTIFICATION_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change new follower notification failure
 * 
 * @alias module:ChangeNewFollowerNotification
 * @function changeNewFollowerNotificationFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change new follower notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_NEW_FOLLOWER_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function changeNewFollowerNotificationFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_NEW_FOLLOWER_NOTIFICATION_FAILURE,
    error,
  };
}