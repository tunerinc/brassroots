'use strict';

/**
 * @module AddPlaylistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {singlePlaylist, lastUpdated} from '../../../reducers/playlists';

/**
 * Adds a single playlist to Redux
 * 
 * @function addSinglePlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state 
 * @param   {object} action 
 * @param   {string} action.type
 * 
 * @returns {object}
 */
export function addSinglePlaylist(state, action) {
  const {tracks} = state;
  const {playlist} = action;
  const newTracks = playlist.tracks ? playlist.tracks.map(trackID => `${playlist.id}-${trackID}`) : [];

  return updateObject(state, {
    ...playlist,
    lastUpdated,
    tracks: tracks.length !== 0
      ? tracks.concat(newTracks).filter((el, i, arr) => i !== arr.indexOf(el))
      : newTracks,
  });  
};

/**
 * Adds multiple playlists to Redux
 * 
 * @function addPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state 
 * @param   {object} action 
 * @param   {string} action.type
 * @param   {object} action.playlists
 * 
 * @returns {object}
 */
export function addPlaylists(state, action) {
  const {playlists} = action;

  let {playlistsByID} = state;

  Object.values(playlists).forEach(playlist => {
    const playlistAction = {...action, playlist};
    const addedPlaylist = singlePlaylist(playlistsByID[playlist.id], playlistAction);
    playlistsByID = updateObject(playlistsByID, {[playlist.id]: addedPlaylist});
  });

  return updateObject(state, {
    lastUpdated,
    playlistsByID,
    totalPlaylists: Object.keys(playlistsByID).length,
    fetchingPlaylists: false,
    error: null,
  });
};