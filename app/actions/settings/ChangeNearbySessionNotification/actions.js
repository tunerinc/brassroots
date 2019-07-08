'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeNearbySessionNotification
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change nearby session notification request
 * 
 * @alias module:ChangeNearbySessionNotification
 * @function changeNearbySessionNotificationRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST
 */
export function changeNearbySessionNotificationRequest(): Action {
  return {
    type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST,
  };
}

/**
 * Notify the app of a change nearby session notification success
 * 
 * @alias module:ChangeNearbySessionNotification
 * @function changeNearbySessionNotificationSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} status The updated nearby session notification status for the current user
 *
 * @returns {object}        Redux action with the type of CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS and the updated notification status
 */
export function changeNearbySessionNotificationSuccess(
  status: string,
): Action {
  return {
    type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change nearby session notification failure
 * 
 * @alias module:ChangeNearbySessionNotification
 * @function changeNearbySessionNotificationFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change nearby session notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function changeNearbySessionNotificationFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE,
    error,
  };
}