'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ReportProblem
 */

import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

/**
 * Notify the app of a report problem request
 * 
 * @alias module:ReportProblem
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of REPORT_PROBLEM_REQUEST
 */
export function request(): Action {
  return {type: types.REPORT_PROBLEM_REQUEST};
}

/**
 * Notify the app of a report problem success
 * 
 * @alias module:ReportProblem
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object}         Redux action with the type of REPORT_PROBLEM_SUCCESS
 */
export function success(): Action {
  return {type: types.REPORT_PROBLEM_SUCCESS};
}

/**
 * Notify the app of a report problem failure
 * 
 * @alias module:ReportProblem
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the report problem failure
 *
 * @returns {object}       Redux action with the type of REPORT_PROBLEM_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.REPORT_PROBLEM_FAILURE,
    error,
  };
}