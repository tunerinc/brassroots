'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTerms
 */

import * as types from '../types';
import {type Action} from '../../../reducers/legal';

/**
 * Notify the app of a get terms request
 * 
 * @alias module:GetTerms
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {boolean} refreshing Whether the current user is refreshing the terms of service
 *
 * @returns {object}             Redux action with the type of GET_TERMS_REQUEST and whether the current user is refreshing
 */
export function request(
  refreshing: boolean,
): Action {
  return {
    type: types.GET_TERMS_REQUEST,
    refreshing,
  };
}

/**
 * Notify the app of a get terms success
 * 
 * @alias module:GetTerms
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} text The updated terms of service as html retrieved from Ultrasound
 *
 * @returns {object}      Redux action with the type of GET_TERMS_SUCCESS and the retrieved terms of service
 */
export function success(
  text: string,
): Action {
  return {
    type: types.GET_TERMS_SUCCESS,
    text,
  };
}

/**
 * Notify the app of a get terms failure
 * 
 * @alias module:GetTerms
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get terms failure
 *
 * @returns {object}       Redux action with the type of GET_TERMS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_TERMS_FAILURE,
    error,
  };
}