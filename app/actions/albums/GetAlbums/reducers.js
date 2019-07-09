'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/albums';

/**
 * Starts the request to get the current user's saved albums
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state             The Redux state
 * @param   {object}  action            The Redux action
 * @param   {string}  action.type       The type of Redux action
 * @param   {boolean} action.refreshing Whether the current user is refreshing their saved albums
 * 
 * @returns {object}                    The state with the fetchingAlbums/refreshingAlbums props updated
 */
export function request(
  state: State,
  action: Action,
): State {
  const {refreshing: refreshingAlbums} = action;
  const updates = typeof refreshingAlbums === 'boolean'
    ? {
      refreshingAlbums,
      fetchingAlbums: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
};

/**
 * Confirms the success of getting the current user's saved albums
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state          The Redux state
 * @param   {object}   action         The Redux action
 * @param   {string}   action.type    The type of Redux action
 * @param   {string[]} action.albums  The Spotify ids of the albums saved in the current user's library
 * @param   {number}   action.total   The total number of albums in the current user's library
 * @param   {boolean}  action.replace Whether or not the albums need to be replaced
 * 
 * @returns {object}                  The state with the current user's saved albums added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {refreshingAlbums, userAlbums: oldAlbums} = state;
  const {albums, total, replace} = action;
  const updates = (
    typeof refreshingAlbums === 'boolean'
    && typeof replace === 'boolean'
    && Array.isArray(oldAlbums)
    && Array.isArray(albums)
  )
    ? {
      lastUpdated,
      totalUserAlbums: total,
      userAlbums: refreshingAlbums || replace
        ? [...albums]
        : [...oldAlbums, ...albums],
      refreshingAlbums: false,
      fetchingAlbums: false,
      error: null,
    }
    : {};

  return updateObject(state, updates);
};

/**
 * Adds the error which caused the get albums failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get albums failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, refreshingAlbums: false, fetchingAlbums: false});
};