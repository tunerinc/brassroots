'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTopMembersReducers
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
 * Confirms the success of getting the top members of a single playlist
 * 
 * @function addMembers
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state             The Redux state
 * @param   {object}   action            The Redux action
 * @param   {string}   action.type       The type of Redux action
 * @param   {string}   action.playlistID The Spotify id of the single playlist
 * @param   {string[]} action.members    The Brassroots ids of the top members of the single playlist
 * 
 * @returns {object}                     The state of the single playlist with the top member ids added
 */
export function addMembers(
  state: Playlist,
  action: Action,
): Playlist {
  const {members} = action;
  const updates = Array.isArray(members)
    ? {members, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top members from a playlist
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingMembers prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingMembers: true, error: null});
}

/**
 * Confirms the success of getting the top members of a playlist
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state             The Redux state
 * @param   {object} action            The Redux action
 * @param   {string} action.type       The type of Redux action
 * @param   {string} action.playlistID The Spotify id of the playlist the top members were fetched for
 * @param   {string} action.members    The Brassroots ids of the top members of the playlist
 * 
 * @returns {object}                   The state with the top members added to the playlist
 */
export function success(
  state: State,
  action: Action,
): State {
  const {playlistsByID: oldPlaylists} = state;
  const {playlistID} = action;
  const updates = typeof playlistID === 'string' && typeof oldPlaylists === 'object'
    ? {
      fetchingMembers: false,
      error: null,
      playlistsByID: updateObject(oldPlaylists, {
        [playlistID]: singlePlaylist(oldPlaylists[playlistID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get playlist top members failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get playlist top members failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingMembers: false});
}