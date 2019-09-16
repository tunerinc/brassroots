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
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST};
}

/**
 * Notify the app of a change nearby session notification success
 * 
 * @alias module:ChangeNearbySessionNotification
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} nearbySession The updated nearby session notification status for the current user
 *
 * @returns {object}               Redux action with the type of CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS and the updated notification status
 */
export function success(
  nearbySession: string,
): Action {
  return {
    type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS,
    updates: {notify: {nearbySession}},
  };
}

/**
 * Notify the app of a change nearby session notification failure
 * 
 * @alias module:ChangeNearbySessionNotification
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change nearby session notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE,
    error,
  };
}