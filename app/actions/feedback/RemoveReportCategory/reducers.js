'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveReportCategoryReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/feedback';

/**
 * Remove a category from the report
 * 
 * @function removeReportCategory
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state           The Redux state
 * @param   {object} action          The Redux action
 * @param   {string} action.type     The type of Redux action
 * @param   {string} action.category The category to remove from the report
 * 
 * @returns {object}                 The state with the category removed from the report
 */
export function removeReportCategory(
  state: State,
  action: Action,
): State {
  const {types} = state;
  const {category} = action;
  const updates: {} = Array.isArray(types) && typeof category === 'string'
    ? {
      types: types.filter(t => t !== category),
    }
    : {};

  return updateObject(state, updates);
}