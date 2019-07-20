'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/playlists';

/**
 * Starts the request to get the saved playlists of the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state             The Redux state
 * @param   {object}  action            The Redux action
 * @param   {string}  action.type       The type of Redux action
 * @param   {boolean} action.refreshing Whether the current user is refreshing their saved playlists
 * 
 * @returns {object}                    The state with the fetchingPlaylists/refreshingPlaylists props updated
 * 
 */
export function request(
  state: State,
  action: Action,
): State {
  const {refreshing: refreshingPlaylists} = action;
  const updates = typeof refreshingPlaylists === 'boolean'
    ? {
      refreshingPlaylists,
      fetchingPlaylists: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the current user's saved playlists
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state            The Redux state
 * @param   {object}   action           The Redux action
 * @param   {string}   action.type      The type of Redux action
 * @param   {string[]} action.playlists The Spotify ids of the current user's saved playlists
 * 
 * @returns {object}                    The state with the user playlists added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {refreshingPlaylists, userPlaylists: oldPlaylists} = state;
  const {playlists, total: totalUserPlaylists} = action;
  const updates = (
    typeof refreshingPlaylists === 'boolean'
    && Array.isArray(oldPlaylists)
    && Array.isArray(playlists)
  )
    ? {
      lastUpdated,
      totalUserPlaylists,
      fetchingPlaylists: false,
      refreshingPlaylists: false,
      error: null,
      userPlaylists: refreshingPlaylists && playlists.length !== 0
        ? [...playlists]
        : [...oldPlaylists, ...playlists]
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get playlists failure
 * 
 * @function failure
 *
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get playlists failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingPlaylists: false, refreshingPlaylists: false});
}