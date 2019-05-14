'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupNameReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/groups';

/**
 * Sets the name for the new group
 * 
 * @function setNewName
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} action.name The name to set for the new group
 * 
 * @returns {object}             The state with the name set for the new group
 */
export function setNewGroupName(
  state: State,
  action: Action,
): State {
  const {name} = action;
  const updates = state.newGroup
    ? {
      newGroup: {
        ...state.newGroup,
        name,
      },
    }
    : state;


  return updateObject(state, updates);
}