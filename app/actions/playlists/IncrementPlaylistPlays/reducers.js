'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementPlaylistPlaysReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singlePlaylist,
  singleTrack,
  type Action,
  type State,
  type Playlist,
  type PlaylistTrack,
} from '../../../reducers/playlists';

/**
 * Confirms the success of incrementing the play count for the current user on a single playlist
 * 
 * @function incrementPlaylist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                The Redux state for a single playlist
 * @param   {object} action               The Redux action
 * @param   {string} action.type          The type of Redux action
 * @param   {string} action.playlistID    The Spotify id of the playlist with an incremented play count
 * @param   {number} action.playlistCount The new play count for the current user on the playlist
 * @param   {string} action.trackID       The Spotify id of the track within the playlist with an incremented play count
 * @param   {number} action.trackCount    The new play count for the current user on a single track within the playlist
 * 
 * @returns {object}                      The state of the single playlist updated with the new play count for the current user
 */
export function incrementPlaylist(
  state: Playlist,
  action: Action,
): Playlist {
  const {playlistCount: userPlays} = action;
  const updates: Playlist = typeof userPlays === 'number'
    ? {userPlays, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of incrementing the play count for the current user on a single playlist track
 * 
 * @function incrementTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                The Redux state
 * @param   {object} action               The Redux action
 * @param   {string} action.type          The type of Redux action
 * @param   {string} action.playlistID    The Spotify id of the playlist with an incremented play count
 * @param   {number} action.playlistCount The new play count for the current user on the playlist
 * @param   {string} action.trackID       The Spotify id of the track within the playlist with an incremented play count
 * @param   {number} action.trackCount    The new play count for the current user on a single track within the playlist
 * 
 * @returns {object}                      The state of the single track with the new play count for the current user
 */
export function incrementTrack(
  state: PlaylistTrack,
  action: Action,
): PlaylistTrack {
  const {trackCount: userPlays} = action;
  const updates: PlaylistTrack = typeof userPlays === 'number'
    ? {userPlays, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to increment the play count for the current user on a playlist & playlist track
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the incrementingCount prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {incrementingCount: true, error: null});
}

/**
 * Confirms the success of incrementing the play count for the current user on a playlist & playlist track
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                The Redux state
 * @param   {object} action               The Redux action
 * @param   {string} action.type          The type of Redux action
 * @param   {string} action.playlistID    The Spotify id of the playlist with an incremented play count
 * @param   {number} action.playlistCount The new play count for the current user on the playlist
 * @param   {string} action.trackID       The Spotify id of the track within the playlist with an incremented play count
 * @param   {number} action.trackCount    The new play count for the current user on a single track within the playlist
 * 
 * @returns {object}                      The state with the new counts added for the playlist & playlist track
 */
export function success(
  state: State,
  action: Action,
): State {
  const {playlistsByID: oldPlaylists, playlistTracksByID: oldTracks} = state;
  const {playlistID, trackID} = action;
  const updates: State = (
    typeof oldPlaylists === 'object'
    && typeof oldTracks === 'object'
    && typeof playlistID === 'string'
    && typeof trackID === 'string'
  )
    ? {
      lastUpdated,
      incrementingCount: false,
      error: null,
      playlistsByID: updateObject(oldPlaylists, {
        [playlistID]: singlePlaylist(oldPlaylists[playlistID], action),
      }),
      playlistTracksByID: updateObject(oldTracks, {
        [`${playlistID}-${trackID}`]: singleTrack(oldTracks[`${playlistID}-${trackID}`], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the increment playlist plays failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the increment playlist plays failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, incrementingCount: false});
}