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
  type Paging,
  type SpotifyError,
} from './types';

type Response = Paging | SpotifyError;
type Options = {
  +fields?: string,
  +limit?: number,
  +offset?: number,
  +market?: string,
};

/**
 * Get full details of the tracks of a playlist owned by a Spotify user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getPlaylistTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-playlists-tracks}
 *
 * @param    {string}  playlistID                            The Spotify playlist id to retrieve tracks from.
 * @param    {object}  options                               The options to use for the request
 * @param    {string}  [options.fields]                      The fields to include/exclude in the response
 * @param    {number}  [options.limit=20]                    The limit of tracks to retrieve from the Spotify playlist
 * @param    {number}  [options.offset=0 (The first object)] The offset from which to start retrieving tracks
 * @param    {string}  [options.market] An ISO 3166-1 alpha-2 country code or the string `from_token` in order to apply [Track Relinking]{@link https://developer.spotify.com/documentation/general/guides/track-relinking-guide}
 *
 * @returns  {Promise}
 * @resolves {object}                                        The track objects of the playlist from Spotify
 * @rejects  {Error}                                         The error which caused the failure
 */
async function getPlaylistTracks(
  playlistID: string,
  options: Options,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/tracks`;
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getPlaylistTracks;