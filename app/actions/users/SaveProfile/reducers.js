'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveProfileReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleUser,
  type User,
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Confirms the success of saving the current user's new profile information
 * 
 * @function save
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                   The Redux state
 * @param   {object} action                  The Redux action
 * @param   {string} action.type             The type of Redux action
 * @param   {object} action.user             The current user's profile information to add
 * @param   {string} action.user.id          The Brassroots id of the current user
 * @param   {string} [action.user.username]  The username of the current user
 * @param   {string} [action.user.bio]       The bio of the current user
 * @param   {string} [action.user.location]  The location of the current user
 * @param   {string} [action.user.website]   The website of the current user
 * @param   {string} [action.user.country]   The country of the current user
 * @param   {string} [action.user.email]     The email of the current user
 * @param   {string} [action.user.birthdate] The month/day of the birthdate for the current user
 * 
 * @returns {object}                         The state of the current user with their information updated
 */
export function save(
  state: User,
  action: Action,
): User {
  const {user} = action;
  const updates = typeof user === 'object' ? {lastUpdated, ...user} : {};
  return updateObject(state, updates);
}

/**
 * Starts the request to save the profile information of the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the savingUser prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {savingUser: true, error: null});
}

/**
 * Confirms the success of saving the profile information for the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                   The Redux state
 * @param   {object} action                  The Redux action
 * @param   {string} action.type             The type of Redux action
 * @param   {object} action.user             The current user's profile information to add
 * @param   {string} action.user.id          The Brassroots id of the current user
 * @param   {string} [action.user.bio]       The bio of the current user
 * @param   {string} [action.user.location]  The location of the current user
 * @param   {string} [action.user.website]   The website of the current user
 * 
 * @returns {object}                         The state with the current user's profile information saved
 */
export function success(
  state: State,
  action: Action,
): State {
  const {currentUserID, usersByID} = state;
  const updates = typeof currentUserID === 'string' && typeof usersByID === 'object'
    ? {
      savingUser: false,
      error: null,
      usersByID: updateObject(usersByID, {
        [currentUserID]: singleUser(usersByID[currentUserID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the save profile failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the save profile failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, savingUser: false});
}