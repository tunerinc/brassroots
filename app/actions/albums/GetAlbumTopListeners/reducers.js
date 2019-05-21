'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopListenersReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleAlbum,
  lastUpdated,
  type Album,
  type Action,
  type State,
} from '../../../reducers/albums';

/**
 * Confirms the success of getting the top listeners of a single album
 * 
 * @function addListeners
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state            The Redux state for the single album
 * @param   {object}   action           The Redux action
 * @param   {string}   action.type      The type of Redux action
 * @param   {string}   action.albumID   The Spotify id of the album
 * @param   {string[]} action.listeners The single album's top listeners and their user ids
 * 
 * @returns {object}                    The state of the single album with the top listeners updated
 */
export function addListeners(
  state: Album,
  action: Action,
): Album {
  const {listeners: topListeners} = action;
  const updates = Array.isArray(topListeners)
    ? {topListeners, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top listeners of a single album
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingListeners prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingListeners: true, error: null});
}

/**
 * Confirms the success of getting the top listeners of a single album
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state            The Redux state
 * @param   {object}   action           The Redux action
 * @param   {string}   action.type      The type of Redux action
 * @param   {string}   action.albumID   The Spotify id of the album
 * @param   {string[]} action.listeners The top listeners of the album and their user ids
 * 
 * @returns {object}                    The state with the album's top listeners updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {albumsByID: oldAlbums} = state;
  const {albumID} = action;
  const updates = typeof albumID === 'string' && typeof oldAlbums === 'object'
    ? {
      fetchingListeners: false,
      error: null,
      albumsByID: updateObject(oldAlbums, {
        [albumID]: singleAlbum(oldAlbums[albumID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get album top listeners failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get album top listeners failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingListeners: false});
}