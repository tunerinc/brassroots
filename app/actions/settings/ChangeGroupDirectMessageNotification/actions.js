'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeGroupDirectMessageNotification
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change group direct message notification request
 * 
 * @alias module:ChangeGroupDirectMessageNotification
 * @function changeGroupDirectMessageNotificationRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST
 */
export function changeGroupDirectMessageNotificationRequest(): Action {
  return {
    type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST,
  };
}

/**
 * Notify the app of a change group direct message notification success
 * 
 * @alias module:ChangeGroupDirectMessageNotification
 * @function changeGroupDirectMessageNotificationSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} status The updated group direct message notification status for the current user
 *
 * @returns {object}        Redux action with the type of CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS and the updated notification status
 */
export function changeGroupDirectMessageNotificationSuccess(
  status: string,
): Action {
  return {
    type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change group direct message notification failure
 * 
 * @alias module:ChangeGroupDirectMessageNotification
 * @function changeGroupDirectMessageNotificationFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change group direct message notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function changeGroupDirectMessageNotificationFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE,
    error,
  };
}