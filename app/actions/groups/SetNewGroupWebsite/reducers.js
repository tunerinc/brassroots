'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupWebsiteReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/groups';

/**
 * Sets the website for the new group
 * 
 * @function setNewGroupWebsite
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.website The website to set for the new group
 * 
 * @returns {object}                The state with the website set for the new group
 */
export function setNewGroupWebsite(
  state: State,
  action: Action,
) {
  const {website, websiteValid} = action;
  const updates = state.newGroup
    ? {
      websiteValid,
      newGroup: {
        ...state.newGroup,
        website,
      },
    }
    : state;

  return updateObject(state, updates);
}