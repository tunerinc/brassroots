'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddReportCategory
 */

import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

/**
 * Adds a category to a report from the current user
 * 
 * @alias module:AddReportCategory
 * @function addReportCategory
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} category The category type the current user is adding to the report
 *
 * @returns {object}          Redux action with the type of ADD_REPORT_CATEGORY and the report category to add
 */
export function addReportCategory(
  category: string,
): Action {
  return {
    type: types.ADD_REPORT_CATEGORY,
    category,
  };
}
