'use strict';

/**
 * @format
 * @flow
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * @module ChangeSessionChatNotification
 */

/**
 * Notify the app of a change session chat notification request
 * 
 * @alias module:ChangeSessionChatNotification
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_SESSION_CHAT_NOTIFICATION_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_SESSION_CHAT_NOTIFICATION_REQUEST};
}

/**
 * Notify the app of a change session chat notification success
 * 
 * @alias module:ChangeSessionChatNotification
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} chat The updated live session chat notification status for the current user
 *
 * @returns {object}      Redux action with the type of CHANGE_SESSION_CHAT_NOTIFICATION_SUCCESS and the updated notification status
 */
export function success(
  chat: string,
): Action {
  return {
    type: types.CHANGE_SESSION_CHAT_NOTIFICATION_SUCCESS,
    updates: {notify: {chat}},
  };
}

/**
 * Notify the app of a change session chat notification failure
 * 
 * @alias module:ChangeSessionChatNotification
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change session chat notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_SESSION_CHAT_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_SESSION_CHAT_NOTIFICATION_FAILURE,
    error,
  };
}