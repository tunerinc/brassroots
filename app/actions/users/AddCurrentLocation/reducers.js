'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentLocationReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleUser,
  type Action,
  type State,
  type User,
} from '../../../reducers/users';

/**
 * Adds the location of the current user
 * 
 * @function addSingleLocation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                     The Redux state
 * @param   {object} action                    The Redux action
 * @param   {string} action.type               The type of Redux action
 * @param   {object} action.location           The location of the single user
 * @param   {number} action.location.latitude  The latitude value of the gps coords
 * @param   {number} action.location.longitude The longitude value of the gps coords
 * 
 * @returns {object}                           The state of the single user with the location added
 */
export function addSingleLocation(
  state: User,
  action: Action,
): User {
  const {location} = action;
  const updates = (
    location
    && typeof location.latitude === 'number'
    && typeof location.longitude === 'number'
  )
    ? {
      coords: {
        lat: location.latitude,
        lon: location.longitude,
      },
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the current gps location of the current user
 * 
 * @function addCurrentLocation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                     The Redux state
 * @param   {object} action                    The Redux action
 * @param   {string} action.type               The type of Redux action
 * @param   {object} action.location           The location of the current user
 * @param   {number} action.location.latitude  The latitude value of the gps coords
 * @param   {number} action.location.longitude The longitude value of the gps coords
 * 
 * @returns {object}                           The state with the gps location of the current user added
 */
export function addCurrentLocation(
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

  return updateObject(state, updates);;
}