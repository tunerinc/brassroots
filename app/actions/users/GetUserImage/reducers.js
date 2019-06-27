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
 * 
 * @param {*} state 
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingImages: true, error: null});
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function success(
  state: State,
  action: Action,
): State {
  const {usersByID: oldUsers} = state;
  const {userID, photo} = action;
  const updates = (
    typeof userID === 'string'
    && typeof photo === 'string'
    && typeof oldUsers === 'object'
  )
    ? {
      fetchingImages: false,
      error: null,
      usersByID: updateObject(oldUsers, {
        [userID]: singleUser(oldUsers[userID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingImages: false});
}