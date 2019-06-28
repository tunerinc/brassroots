'use strict';

/**
 * @module AddAlbumsReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleAlbum, lastUpdated} from '../../../reducers/albums';

/**
 * Adds a single album to the Redux state
 * 
 * @function addSingleAlbum
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                   The Redux state for the single album
 * @param   {object}   action                  The Redux action
 * @param   {string}   action.type             The type of Redux action
 * @param   {object}   action.albums           The albums being added to Redux
 * @param   {string}   action.album            The album object ot add
 * @param   {string}   action.album.id         The Spotify id of the album
 * @param   {string}   action.album.name       The name of the Spotify album
 * @param   {string}   action.album.image      The image url of the Spotify album, if available
 * @param   {string[]} action.album.artists    The Spotify ids of the album artists
 * @param   {string[]} action.album.tracks     The tracks of the album in order by track number
 * @param   {number}   action.album.totalPlays The total amount of plays for the album
 * @param   {string[]} action.album.userTracks The tracks of the album the current user has saved in their library
 * @param   {boolean}  action.refreshingAlbums Whether the current user is refreshing the albums
 * 
 * @returns {object}                           The state of the newly added single album
 */
export function addSingleAlbum(state, action) {
  const {tracks, userTracks: oldTracks} = state;
  const {album, refreshingAlbums} = action;
  const {userTracks} = album;

  return updateObject(state, {
    ...album,
    lastUpdated,
    userTracks: Array.isArray(userTracks) && userTracks.length && refreshingAlbums
      ? [...userTracks]
      : Array.isArray(userTracks) && userTracks.length
      ? [...oldTracks, ...userTracks].filter((el, i, arr) => i === arr.indexOf(el))
      : [...oldTracks],
    tracks: Array.isArray(album.tracks) && album.tracks.length && refreshingAlbums
      ? [...album.tracks]
      : Array.isArray(album.tracks) && album.tracks.length
      ? [...tracks, ...album.tracks].filter((el, i, arr) => i === arr.indexOf(el))
      : [...tracks],
  });
}

/**
 * Adds multiple albums to Redux
 * 
 * @function addAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {object} action.albums The albums to add to Redux
 * 
 * @returns {object}               The state with the albumsByID prop updated
 */
export function addAlbums(state, action) {
  let {albumsByID, refreshingAlbums} = state;

  const {albums} = action;

  Object.values(albums).forEach(album => {
    const addedAlbum = singleAlbum(albumsByID[album.id], {...action, album, refreshingAlbums});
    albumsByID = updateObject(albumsByID, {[album.id]: addedAlbum});
  });
  
  return updateObject(state, {
    albumsByID,
    lastUpdated,
    totalAlbums: Object.keys(albumsByID).length,
    error: null,
  });
};