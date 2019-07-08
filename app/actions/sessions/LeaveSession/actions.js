'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module LeaveSession
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a leave session request
 * 
 * @alias module:LeaveSession
 * @function leaveSessionRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of LEAVE_SESSION_REQUEST
 */
export function leaveSessionRequest(): Action {
  return {
    type: types.LEAVE_SESSION_REQUEST,
  };
}

/**
 * Notify the app of a leave session success
 * 
 * @alias module:LeaveSession
 * @function leaveSessionSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} sessionID The session id the current user has successfully left
 *
 * @returns {string}           Redux action with the type of LEAVE_SESSION_SUCCESS and the session the current user left
 */
export function leaveSessionSuccess(
  sessionID: string,
): Action {
  return {
    type: types.LEAVE_SESSION_SUCCESS,
    sessionID,
  };
}

/**
 * Notify the app of a leave session failure
 * 
 * @alias module:LeaveSession
 * @function leaveSessionFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the leave session failure
 *
 * @returns {object}       Redux action with the type of LEAVE_SESSION_FAILURE and the error which caused the failure
 */
export function leaveSessionFailure(
  error: Error,
): Action {
  return {
    type: types.LEAVE_SESSION_FAILURE,
    error,
  };
}