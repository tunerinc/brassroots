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
  const {fetching} = state;
  const {refreshing} = action;

  return updateObject(state, {
    refreshing,
    fetching: Array.isArray(fetching) ? fetching.concat('albums') : ['albums'],
    error: null,
  });
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
  const {refreshing, fetching, userAlbums: oldAlbums} = state;
  const {albums, replace, total: totalUserAlbums} = action;
  const updates = Array.isArray(fetching) && Array.isArray(oldAlbums) && Array.isArray(albums)
    ? {
      lastUpdated,
      totalUserAlbums,
      error: null,
      refreshing: false,
      fetching: fetching.filter(t => t !== 'albums'),
      userAlbums: refreshing || replace
        ? [...albums]
        : [...oldAlbums, ...albums],
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
  const {fetching} = state;
  const {error} = action;

  return updateObject(state, {
    error,
    refreshing: false,
    fetching: Array.isArray(fetching) ? fetching.filter(t => t !== 'albums') : [],
  });
};