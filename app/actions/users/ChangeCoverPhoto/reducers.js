'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeCoverPhotoReducers
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
 * Confirms the success of changing the cover photo for the current user
 * 
 * @function addImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {string} action.photo The current user's new cover photo to add
 * 
 * @returns {object}              The state of the current user with the new cover photo added
 */
export function addImage(
  state: User,
  action: Action,
): User {
  const {coverImage} = state;
  const {photo} = action;
  const updates = typeof photo === 'string' || typeof coverImage === 'string'
    ? {
      lastUpdated,
      coverImage: photo || coverImage,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to change the cover photo of the current user
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
  return updateObject(state, {changingImage: 'cover', error: null});
}

/**
 * Confirms the success of changing the cover photo of the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the changingImage prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {changingImage: null, error: null});
}

/**
 * Adds the error which caused the change cover photo failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the change cover photo failure
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