'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeFavoriteTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Starts the request to change the favorite track of the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the changingFavoriteTrack prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {changingFavoriteTrack: true, error: null});
}

/**
 * Confirms the success of changing the current user's favorite track
 * 
 * @function success
 * 
 * @author Aldo Gonzalez
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the changingFavoriteTrack prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {changingFavoriteTrack: false, error: null});
}

/**
 * Adds the error which caused the change favorite track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the change favorite track failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, changingFavoriteTrack: false});
}