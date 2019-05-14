'use strict';

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/feedback';

/**
 * @module AddReportCategoryReducers
 */

/**
 * Adds the category for the report
 * 
 * @function addReportCategory
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state           The Redux state
 * @param   {object} action          The Redux action
 * @param   {string} action.type     The type of Redux action
 * @param   {string} action.category The category to add to the report
 * 
 * @returns {object}                 The state with the category added to the report
 */
export function addReportCategory(
  state: State,
  action: Action,
): State {
  const {types} = state;
  const {category} = action;
  const updates: {} = Array.isArray(types) && typeof category === 'string'
    ? {
      types: types.concat(category),
    }
    : {};

  return updateObject(state, updates);
}