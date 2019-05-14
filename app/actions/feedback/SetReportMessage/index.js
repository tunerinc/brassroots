'use strict';

/**
 * @format
 * @flow
 */

import * as types from '../types';
import type {Action} from '../../../reducers/feedback';

/**
 * @module SetReportMessage
 */

/**
 * Sets the message for a report from the current user
 * 
 * @alias module:SetReportMessage
 * @function setReportMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} message The report message the current user has entered
 *
 * @returns {object}         Redux action with the type of SET_REPORT_MESSAGE and the current user's report message
 */
export function setReportMessage(
  message: string,
): Action {
  return {
    type: types.SET_REPORT_MESSAGE,
    message,
  };
}
