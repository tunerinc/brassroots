'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeSessionsNotification
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change sessions notification request
 * 
 * @alias module:ChangeSessionsNotification
 * @function changeSessionsNotificationRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_SESSIONS_NOTIFICATION_REQUEST
 */
export function changeSessionsNotificationRequest(): Action {
  return {
    type: types.CHANGE_SESSIONS_NOTIFICATION_REQUEST,
  };
}

/**
 * Notify the app of a change sessions notification success
 * 
 * @alias module:ChangeSessionsNotification
 * @function changeSessionsNotificationSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} status The new live sessions notification status for the current user
 *
 * @returns {object}        Redux action with the type of CHANGE_SESSIONS_NOTIFICATION_SUCCESS and the new live sessions notification status
 */
export function changeSessionsNotificationSuccess(
  status: string
): Action {
  return {
    type: types.CHANGE_SESSIONS_NOTIFICATION_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change sessions notification failure
 * 
 * @alias module:ChangeSessionsNotification
 * @function changeSessionsNotificationFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change sessions notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_SESSIONS_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function changeSessionsNotificationFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_SESSIONS_NOTIFICATION_FAILURE,
    error,
  };
}