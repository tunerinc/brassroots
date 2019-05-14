'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupLocationReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/groups';

/**
 * Sets the location for the new group
 * 
 * @function setNewGroupLocation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state           The Redux state
 * @param   {object} action          The Redux action
 * @param   {string} action.type     The type of Redux action
 * @param   {string} action.location The location to set for the new group
 * 
 * @returns {object}                 The state with the location set for the new group
 */
export function setNewGroupLocation(
  state: State,
  action: Action,
): State {
  const {location} = action;
  const updates = state.newGroup
    ? {
      newGroup: {
        ...state.newGroup,
        location,
      },
    }
    : state;


  return updateObject(state, updates);
}