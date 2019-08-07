'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTopTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singlePlaylist,
  type Action,
  type State,
  type Playlist,
} from '../../../reducers/playlists';

/**
 * Confirms the success of getting the top tracks of a single playlist
 * 
 * @function addTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state             The Redux state
 * @param   {object}   action            The Redux action
 * @param   {string}   action.type       The type of Redux action
 * @param   {string}   action.playlistID The Spotify id of the single playlist
 * @param   {string[]} action.topTracks  The Spotify ids of the top tracks of the plaaylist
 * 
 * @returns {object}                     The state of the single playlist with the top tracks added
 */
export function addTracks(
  state: Playlist,
  action: Action,
): Playlist {
  const {id: playlistID} = state;
  const {topTracks} = action;
  const updates = typeof playlistID === 'string' && Array.isArray(topTracks)
    ? {
      lastUpdated,
      topTracks: topTracks.map(trackID => {
        if (typeof trackID === 'string') {
          return `${playlistID}-${trackID}`;
        }

        return;
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top tracks of a playlist
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingTopTracks prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingTopTracks: true, error: null});
}

/**
 * Confirms the success of getting the top tracks of a playlist
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingTopTracks prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {fetchingTopTracks: false, error: null});
}

/**
 * Adds the error which caused the get playlist top tracks failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get playlist top tracks failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingTopTracks: false});
}