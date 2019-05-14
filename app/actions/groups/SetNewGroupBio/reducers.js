'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupBioReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/groups';

/**
 * Sets the bio for the new group
 * 
 * @function setNewGroupBio
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} action.bio  The bio to set for the new group
 * 
 * @returns {object}             The state with the bio set for the new group
 */
export function setNewGroupBio(
  state: State,
  action: Action,
): State {
  const {bio} = action;
  const updates = state.newGroup
    ? {
      newGroup: {
        ...state.newGroup,
        bio,
      },
    }
    : state;

  return updateObject(state, updates);
}