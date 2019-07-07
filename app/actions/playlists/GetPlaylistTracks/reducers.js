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
 * 
 * @param {*} state 
 * @param {*} action 
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
 * 
 * @param {*} state 
 * @param {*} action 
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
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function success(
  state: State,
  action: Action,
): State {
  const {refreshingTracks, playlistsByID: oldPlaylists} = state;
  const {playlistID} = action;
  const updates = typeof playlistID === 'string' && typeof oldPlaylists === 'object'
    ? {
      refreshingTracks: false,
      fetchingTracks: false,
      error: null,
      playlistsByID: updateObject(oldPlaylists, {
        [playlistID]: singlePlaylist(
          oldPlaylists[playlistID],
          {...action, refreshing: refreshingTracks},
        ),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingTracks: false, refreshingTracks: false});
}