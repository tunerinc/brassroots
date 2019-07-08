'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SpotifyAPI
 */

import Spotify from 'rn-spotify-sdk';
import {type SpotifyError} from './types';

type Response = empty | SpotifyError;
type Playlist = {
  +name: string,
  +public: boolean,
  +collaborative: boolean,
  +description: string,
};

/**
 * Change a playlist’s name and public/private state.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function changePlaylistDetails
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/change-playlist-details/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-change-playlist-details}
 *
 * @param    {string}  playlistID               The Spotify playlist id to change details for.
 * @param    {object}  playlist                 The playlist information with the changed details.
 * @param    {string}  [playlist.name]          The new name for the playlist
 * @param    {boolean} [playlist.public]        If `true`, the playlist will be public, if `false`, the playlist will be private.
 * @param    {boolean} [playlist.collaborative] If `true`, the playlist will be collaborative. Note that to create a collaborative playlist, you must also set `public` to `false`.
 * @param    {string}  [playlist.description]   The new description for the playlist
 *
 * @returns  {Promise}
 * @resolves {object}                           The playlist of the Spotify with the new, changed details
 * @rejects  {Error}                            The error which caused the failure
 */
async function changePlaylistDetails(
  playlistID: string,
  playlist: Playlist,
) {
  try {
    const url: string = `v1/playlists/${playlistID}`;
    return await Spotify.sendRequest(url, 'PUT', playlist, true);
  } catch (err) {
    return err;
  }
}

module.exports = changePlaylistDetails;