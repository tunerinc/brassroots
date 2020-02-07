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
type Options = {
  +fields?: string,
  +market?: string,
};

/**
 * Get a playlist owned by a Spotify user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getPlaylist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-playlist}
 *
 * @param    {string}  playlistID       The Spotify playlist id to retrieve.
 * @param    {object}  options          The options to use for the request
 * @param    {string}  [options.fields] A comma-separated list of fields to optionally include/exclude in the response
 * @param    {string}  [options.market] An ISO 3166-1 alpha-2 country code or the string `from_token` in order to apply [Track Relinking]{@link https://developer.spotify.com/documentation/general/guides/track-relinking-guide}
 *
 * @returns  {Promise}
 * @resolves {object}                   The playlist object of the user from Spotify
 * @rejects  {Error}                    The error which caused the failure
 */
async function getPlaylist(
  playlistID: string,
  options: Options,
) {
  try {
    const url: string = `v1/playlists/${playlistID}`;
    return await Spotify.sendRequest(url, 'GET', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = getPlaylist;