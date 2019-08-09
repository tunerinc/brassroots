'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserImageReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleUser,
  lastUpdated,
  type Action,
  type State,
  type User,
} from '../../../reducers/users';

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function addImage(
  state: User,
  action: Action,
): User {
  const {photo: profileImage} = action;
  const updates = typeof profileImage === 'string' ? {profileImage} : {};
  return updateObject(state, updates);
}

/**
 * Starts the request to get the images of a user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingImages prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingImages: true, error: null});
}

/**
 * Confirms the success of getting the images of a user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingImages prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {fetchingImages: false, error: null});
}

/**
 * Adds the error which caused the get user image failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get user image failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingImages: false});
}