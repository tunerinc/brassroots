'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPolicy
 */

import * as types from '../types';
import {type Action} from '../../../reducers/legal';

/**
 * Notify the app of a get policy request
 * 
 * @alias module:GetPolicy
 * @function getPolicyRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing the privacy policy
 *
 * @returns {object}             Redux action with the type of GET_POLICY_REQUEST
 */
export function getPolicyRequest(
  refreshing: boolean,
): Action {
  return {
    type: types.GET_POLICY_REQUEST,
    refreshing,
  };
}

/**
 * Notify the app of a get policy success
 * 
 * @alias module:GetPolicy
 * @function getPolicySuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} text The most recent privacy policy as html retrieved from Ultrasound
 *
 * @returns {object}      Redux action with the type of GET_POLICY_SUCCESS and the most recent privacy policy
 */
export function getPolicySuccess(
  text: string,
): Action {
  return {
    type: types.GET_POLICY_SUCCESS,
    text,
  };
}

/**
 * Notify the app of a get policy failure
 * 
 * @alias module:GetPolicy
 * @function getPolicyFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get policy failure
 *
 * @returns {object}       Redux action with the type of GET_POLICY_FAILURE and the error which caused the failure
 */
export function getPolicyFailure(
  error: Error,
): Action {
  return {
    type: types.GET_POLICY_FAILURE,
    error,
  };
}