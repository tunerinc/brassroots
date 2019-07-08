'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTopPlaylistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Starts the request to get the top playlists for a user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingTopPlaylists prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingTopPlaylists: true, error: null});
}

/**
 * Confirms the success of getting a user's top playlists
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state The Redux state
 * 
 * @returns {object}         The state with the fetchingTopPlaylists prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {fetchingTopPlaylists: false, error: null});
}

/**
 * Adds the error which caused the get top playlists failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get top playlists failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingTopPlaylists: false});
}