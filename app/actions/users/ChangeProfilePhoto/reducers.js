'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeProfilePhotoReducers
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
 * Confirms the success of changing the profile photo of the current user
 * 
 * @function addImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {string} action.photo The current user's new profile photo to add
 * 
 * @returns {object}              The state of the current user with the new profile photo added
 */
export function addImage(
  state: User,
  action: Action,
): User {
  const {profileImage} = state;
  const {photo} = action;
  const updates = typeof photo === 'string' || typeof profileImage === 'string'
    ? {
      lastUpdated,
      profileImage: photo || profileImage,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to change the profile photo of the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the changingImage prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {changingImage: 'profile', error: null});
}

/**
 * Confirms the success of changing the profile photo of the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the profile photo changed for the current user
 */
export function success(
  state: State,
): State {
  return updateObject(state, {changingImage: null, error: null});
}

/**
 * Adds the error which caused the change profile photo failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the change profile photo failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, changingImage: null});
}