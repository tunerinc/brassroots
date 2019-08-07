'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singlePlaylist,
  lastUpdated,
  type Action,
  type State,
  type Playlist,
} from '../../../reducers/playlists';

/**
 * Confirms the success of getting the tracks of a single playlist
 * 
 * @function addTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state             The Redux state
 * @param   {object}   action            The Redux action
 * @param   {string}   action.type       The type of Redux action
 * @param   {string}   action.playlistID The Spotify id of the single playlist
 * @param   {string[]} action.tracks     The Spotify ids of the tracks from the playlist
 * 
 * @returns {object}                     The state of the single playlist with the new tracks added
 */
export function addTracks(
  state: Playlist,
  action: Action,
): Playlist {
  const {tracks: oldTracks} = state;
  const {refreshing, tracks, playlistID, total} = action;
  const updates = (
    Array.isArray(oldTracks)
    && Array.isArray(tracks)
    && typeof refreshing === 'boolean'
    && typeof playlistID === 'string'
    && typeof total === 'number'
  )
    ? {
      lastUpdated,
      total,
      tracks: refreshing ? [...tracks] : [...oldTracks, ...tracks],
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the tracks of a playlist
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state             The Redux state
 * @param   {object}  action            The Redux action
 * @param   {string}  action.type       The type of Redux action
 * @param   {boolean} action.refreshing Whether the current user is refreshing the playlist tracks
 * 
 * @returns {object}                    The state with the refreshingTracks/fetchingTracks prop updated
 */
export function request(
  state: State,
  action: Action,
): State {
  const {refreshing: refreshingTracks} = action;
  const updates = typeof refreshingTracks === 'boolean'
    ? {
      refreshingTracks,
      fetchingTracks: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the tracks of a playlist
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the refreshingTracks/fetchingTracks props updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {refreshingTracks: false, fetchingTracks: false, error: null});
}

/**
 * Adds the error which caused the get playlist tracks failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get playlist tracks failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingTracks: false, refreshingTracks: false});
}