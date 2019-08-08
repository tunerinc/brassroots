'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module JoinSession
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Notify the app of a join session request
 * 
 * @alias module:JoinSession
 * @function joinSessionRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of JOIN_SESSION_REQUEST
 */
export function joinSessionRequest(): Action {
  return {type: types.JOIN_SESSION_REQUEST};
}

/**
 * Notify the app of a join session success
 * 
 * @alias module:JoinSession
 * @function joinSessionSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} sessionID The id of the session the current user has joined
 *
 * @returns {object}           Redux action with the type of JOIN_SESSION_SUCCESS and the session id
 */
export function joinSessionSuccess(
  sessionID: string,
): Action {
  return {
    type: types.JOIN_SESSION_SUCCESS,
    sessionID,
  };
}

/**
 * Notify the app of a join session failure
 * 
 * @alias module:JoinSession
 * @function joinSessionFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the join session failure
 *
 * @returns {object}       Redux action with the type of JOIN_SESSION_FAILURE and the error which caused the failure
 */
export function joinSessionFailure(
  error: Error,
): Action {
  return {
    type: types.JOIN_SESSION_FAILURE,
    error,
  };
}