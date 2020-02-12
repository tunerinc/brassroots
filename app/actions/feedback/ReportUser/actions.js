'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ReportUser
 */

import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

/**
 * Notify the app of a report user request
 * 
 * @alias module:ReportUser
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of REPORT_USER_REQUEST
 */
export function request(): Action {
  return {type: types.REPORT_USER_REQUEST};
}

/**
 * Notify the app of a report user success
 * 
 * @alias module:ReportUser
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object}      Redux action with the type of REPORT_USER_SUCCESS
 */
export function success(): Action {
  return {type: types.REPORT_USER_SUCCESS};
}

/**
 * Notify the app of a report user failure
 * 
 * @alias module:ReportUser
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the report user failure
 *
 * @returns {object}       Redux action with the type of REPORT_USER_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.REPORT_USER_FAILURE,
    error,
  };
}