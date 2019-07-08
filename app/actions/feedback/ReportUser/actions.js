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
 * @function reportUserRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of REPORT_USER_REQUEST
 */
export function reportUserRequest(): Action {
  return {
    type: types.REPORT_USER_REQUEST,
  };
}

/**
 * Notify the app of a report user success
 * 
 * @alias module:ReportUser
 * @function reportUserSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object}      Redux action with the type of REPORT_USER_SUCCESS
 */
export function reportUserSuccess(): Action {
  return {
    type: types.REPORT_USER_SUCCESS,
  };
}

/**
 * Notify the app of a report user failure
 * 
 * @alias module:ReportUser
 * @function reportUserFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the report user failure
 *
 * @returns {object}       Redux action with the type of REPORT_USER_FAILURE and the error which caused the failure
 */
export function reportUserFailure(
  error: Error,
): Action {
  return {
    type: types.REPORT_USER_FAILURE,
    error,
  };
}