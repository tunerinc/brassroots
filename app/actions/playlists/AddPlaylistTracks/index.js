'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddPlaylistTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Adds tracks from a playlist
 * 
 * @function addPlaylistTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}   playlistID       The Spotify id of the playlist
 * @param   {object[]} tracks           The tracks to add from a playlist
 * @param   {string}   tracks[].trackID The Spotify id of the track
 * @param   {string}   tracks[].userID  The Brassroots id of the user who added the track
 * 
 * @returns {object}                    Redux action with the type of ADD_PLAYLIST_TRACKS and the tracks to add from a playlist
 */
export function addPlaylistTracks(
  playlistID: string,
  tracks: Array<
    {
      trackID: string,
      userID: string,
    }
  >,
): Action {
  return {
    type: types.ADD_PLAYLIST_TRACKS,
    playlistID,
    tracks,
  };
}