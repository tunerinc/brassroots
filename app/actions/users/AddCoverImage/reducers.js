'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCoverImageReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleUser,
  type Action,
  type State,
  type User,
} from '../../../reducers/users';

/**
 * Adds the cover image of the current user
 * 
 * @function addSingleCoverImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {string} action.photo The cover image to add for the single user
 * 
 * @returns {object}              The state of the single user with the cover image added
 */
export function addSingleCoverImage(
  state: User,
  action: Action,
): User {
  const {photo: coverImage} = action;
  const updates = typeof coverImage === 'string' ? {coverImage} : {};
  return updateObject(state, updates);
}

/**
 * Adds the cover image of the current user
 * 
 * @function addCoverImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {string} action.photo The cover photo to add for the current user
 * 
 * @returns {object}              The state with the cover image for the current user added
 */
export function addCoverImage(
  state: State,
  action: Action,
): State {
  const {currentUserID, usersByID} = state;
  const updates = typeof currentUserID === 'string' && typeof usersByID === 'object'
    ? {
      usersByID: updateObject(usersByID, {
        [currentUserID]: singleUser(usersByID[currentUserID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}