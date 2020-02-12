'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SpotifyAPI
 */

import Spotify from 'rn-spotify-sdk';
import {
  type FullPlaylist,
  type SpotifyError,
} from './types';

type Response = FullPlaylist | SpotifyError;
type NewPlaylist = {
  +name: string,
  +public: boolean,
  +collaborative: boolean,
  +description: string,
};

/**
 * Create a playlist for a Spotify user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function createPlaylist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-create-playlist}
 *
 * @param    {string}  userID                   The Spotify user id to create a playlist for.
 * @param    {object}  playlist                 The playlist information to create for the Spotify user.
 * @param    {string}  [playlist.name]          The name for the new playlist. This name does not need to be unique; a user may have several playlists with the same name
 * @param    {boolean} [playlist.public]        If `true`, the playlis will be public, if `false`, the playlist will be private.
 * @param    {boolean} [playlist.collaborative] If `true`, the playlist will be collaborative. Note that to create a collaborative playlist, you must also set `public` to `false`.
 * @param    {string}  [playlist.description]   The description of the playlist to create
 *
 * @returns  {Promise}
 * @resolves {object}                           The playlist that was created for the Spotify user
 * @rejects  {Error}                            The error which caused the failure
 */
async function createPlaylist(
  userID: string,
  playlist: NewPlaylist,
) {
  try {
    const url: string = `v1/users/${userID}/playlists`;
    return await Spotify.sendRequest(url, 'POST', playlist, true);
  } catch (err) {
    return err;
  }
}

module.exports = createPlaylist;