'use strict';

/**
 * @module AddPlaylistTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {singlePlaylistTrack, lastUpdated} from '../../../reducers/playlists';

/**
 * Adds a single playlist track to Redux
 * 
 * @function addSinglePlaylistTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                   The Redux state
 * @param   {object}   action                  The Redux action
 * @param   {string}   action.type             The type of Redux action
 * @param   {object[]} action.tracks           The tracks to add from a playlist
 * @param   {string}   action.tracks[].id      The id of the playlist track, {playlistID}-{trackID}
 * @param   {string}   action.tracks[].trackID The Spotify id of the track
 * @param   {string}   action.tracks[].userID  The Brassroots id of the user who added the track
 * @param   {object}   action.track            The single track object to add
 * @param   {string}   action.track.trackID    The Spotify id of the single track to add
 * @param   {string}   action.track.userID     The Brassroots id of the user who added the track
 * 
 * @returns {object}                           The state of the single track updated
 */
export function addSinglePlaylistTrack(state, action) {
  const {track} = action;
  return updateObject(state, {...track});
}

/**
 * Adds tracks from a playlist
 * 
 * @function addPlaylistTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                   The Redux state
 * @param   {object}   action                  The Redux action
 * @param   {string}   action.type             The type of Redux action
 * @param   {object[]} action.tracks           The tracks to add from a playlist
 * @param   {string}   action.tracks[].id      The id of the playlist track, {playlistID}-{trackID}
 * @param   {string}   action.tracks[].trackID The Spotify id of the track
 * @param   {string}   action.tracks[].userID  The Brassroots id of the user who added the track
 * 
 * @returns {object}                           The state with the playlist tracks added
 */
export function addPlaylistTracks(state, action) {
  const {tracks} = action;
  
  let {playlistTracksByID} = state;

  Object.values(tracks).forEach(track => {
    const addedTrack = singlePlaylistTrack(playlistTracksByID[track.id], {...action, track});
    playlistTracksByID = updateObject(playlistTracksByID, {[track.id]: addedTrack});
  });

  return updateObject(state, {
    lastUpdated,
    playlistTracksByID,
    totalPlaylistTracks: Object.keys(playlistTracksByID).length,
    error: null,
  });
}