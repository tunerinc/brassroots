'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeDirectMessageNotification
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a change direct message notification request
 * 
 * @alias module:ChangeDirectMessageNotification
 * @function changeDirectMessageNotificationRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_DIRECT_MESSAGE_NOTIFICATION_REQUEST
 */
export function changeDirectMessageNotificationRequest(): Action {
  return {
    type: types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_REQUEST,
  };
}

/**
 * Notify the app of a change direct message notification success
 * 
 * @alias module:ChangeDirectMessageNotification
 * @function changeDirectMessageNotificationSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} status The new direct message notification status for the current user
 *
 * @returns {object}         Redux action with the type of CHANGE_DIRECT_MESSAGE_NOTIFICATION_SUCCESS and the new notification status
 */
export function changeDirectMessageNotificationSuccess(
  status: boolean,
): Action {
  return {
    type: types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change direct message notification failure
 * 
 * @alias module:ChangeDirectMessageNotification
 * @function changeDirectMessageNotificationFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change direct message notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_DIRECT_MESSAGE_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function changeDirectMessageNotificationFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_FAILURE,
    error,
  };
}