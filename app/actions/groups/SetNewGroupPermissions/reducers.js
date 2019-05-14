'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupPermissionsReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/groups';

/**
 * Sets the permissions for the new group
 * 
 * @function setNewGroupPermissions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state             The Redux state
 * @param   {object} action            The Redux action
 * @param   {string} action.type       The type of Redux action
 * @param   {string} action.permission The permission to set for the new group
 * 
 * @returns {object}                   The state with the permission set for the new group
 */
export function setNewGroupPermissions(
  state: State,
  action: Action,
): State {
  const {permission: join} = action;
  const updates = state.newGroup
    ? {
      newGroup: {
        ...state.newGroup,
        join,
      },
    }
    : state;

  return updateObject(state, updates);
}