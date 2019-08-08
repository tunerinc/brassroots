'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateSession
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a create session request
 * 
 * @alias module:CreateSession
 * @function createSessionRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_SESSION_REQUEST
 */
export function createSessionRequest(): Action {
  return {type: types.CREATE_SESSION_REQUEST};
}

/**
 * Notify the app of a create session success
 * 
 * @alias module:CreateSession
 * @function createSessionSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} sessionID The Brassroots id of the created session
 *
 * @returns {object}           Redux action with the type of CREATE_SESSION_REQUEST and the created session id
 */
export function createSessionSuccess(
  sessionID: string,
): Action {
  return {
    type: types.CREATE_SESSION_SUCCESS,
    sessionID,
  };
}

/**
 * Notify the app of a create session failure
 * 
 * @alias module:CreateSession
 * @function createSessionFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the create session failure
 *
 * @returns {object}       Redux action with the type of CREATE_SESSION_FAILURE and the error which caused the failure
 */
export function createSessionFailure(
  error: Error,
): Action {
  return {
    type: types.CREATE_SESSION_FAILURE,
    error,
  };
}