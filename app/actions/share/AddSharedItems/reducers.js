'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddSharedItemsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/share';

/**
 * Adds the items the current user wishes to share
 * 
 * @function addSharedItems
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {object} action.items The items the current user is about to share
 * 
 * @returns {object}              The state with the sharedItems added
 */
export function addSharedItems(
  state: State,
  action: Action,
): State {
  const {items: sharedItems} = action;
  const updates = typeof sharedItems === 'object'
    ? {sharedItems}
    : {};

  return updateObject(state, updates);
}