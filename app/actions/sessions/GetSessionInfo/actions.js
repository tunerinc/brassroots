'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetSessionInfo
 */

import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

/**
 * Notify the app of a get session info request
 * 
 * @alias module:GetSessionInfo
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of GET_SESSION_INFO_REQUEST
 */
export function request(): Action {
  return {type: types.GET_SESSION_INFO_REQUEST};
}

/**
 * 
 * 
 * @callback unsubscribe
 */

/**
 * Notify the app of a get session info success
 * 
 * @alias module:GetSessionInfo
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {unsubscribe} unsubscribe The function to invoke to unsubscribe from the info listener
 * 
 * @return {object}                  Redux action with the type of GET_SESSION_INFO_SUCCESS and the retrieved session info
 */
export function success(
  unsubscribe: () => void,
): Action {
  return {
    type: types.GET_SESSION_INFO_SUCCESS,
    unsubscribe,
  };
}

/**
 * Notify the app of a get session info failure
 * 
 * @alias module:GetSessionInfo
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error The error which caused the get session info failure
 * 
 * @return {object}       Redux action with the type of GET_SESSION_INFO_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_SESSION_INFO_FAILURE,
    error,
  };
}