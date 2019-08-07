'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopPlaylistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleArtist,
  lastUpdated,
  type Artist,
  type Action,
  type State,
} from '../../../reducers/artists';

/**
 * Confirms the success of getting the top playlists of a single artist
 * 
 * @function addPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state              The Redux state of the single artist
 * @param   {object}   action             The Redux action
 * @param   {string}   action.type        The type of Redux action
 * @param   {string}   action.artistID    The Spotify id of the artist
 * @param   {string[]} action.playlistIDs The top playlists of the artist and their Spotify ids
 * 
 * @returns {object}                      The state of the single artist and the top playlists updated
 */
export function addPlaylists(
  state: Artist,
  action: Action,
): Artist {
  const {playlistIDs: topPlaylists} = action;
  const updates = Array.isArray(topPlaylists)
    ? {topPlaylists, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top playlists of a single artist
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingPlaylists prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingPlaylists: true, error: null});
}

/**
 * Confirms the success of getting the top playlists of a single artist
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingPlaylists prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {fetchingPlaylists: false, error: null});
}

/**
 * Adds the error which caused the get artist top playlists failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get artist top playlists failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingPlaylists: false});
}