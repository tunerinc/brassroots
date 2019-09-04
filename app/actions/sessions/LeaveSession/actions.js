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
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of LEAVE_SESSION_REQUEST
 */
export function request(): Action {
  return {type: types.LEAVE_SESSION_REQUEST};
}

/**
 * Notify the app of a leave session success
 * 
 * @alias module:LeaveSession
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} isOwner Whether the current user is the owner of the session they left
 *
 * @returns {string}          Redux action with the type of LEAVE_SESSION_SUCCESS and whether the current user was the owner
 */
export function success(
  isOwner: boolean,
): Action {
  return {
    type: types.LEAVE_SESSION_SUCCESS,
    isOwner,
  };
}

/**
 * Notify the app of a leave session failure
 * 
 * @alias module:LeaveSession
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the leave session failure
 *
 * @returns {object}       Redux action with the type of LEAVE_SESSION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.LEAVE_SESSION_FAILURE,
    error,
  };
}