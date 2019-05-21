'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveReportCategory
 */

import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

/**
 * Removes a category to a report from the current user
 * 
 * @alias module:RemoveReportCategory
 * @function removeReportCategory
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} category The category type the current user is removing from the report
 *
 * @returns {object}          Redux action with the type of REMOVE_REPORT_CATEGORY and the report category to remove
 */
export function removeReportCategory(
  category: string,
): Action {
  return {
    type: types.REMOVE_REPORT_CATEGORY,
    category,
  };
}
