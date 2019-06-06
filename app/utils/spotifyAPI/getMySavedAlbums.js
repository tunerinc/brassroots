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
  +limit?: number,
  +offset?: number,
  +market?: string,
};

/**
 * Get a list of the albums saved in the current Spotify user’s “Your Music” library.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getMySavedAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-albums/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-users-saved-albums}
 *
 * @param    {object}  options                               The options to use for the request
 * @param    {number}  [options.limit=20]                    The limit of albums to retrieve from the current user's library.
 * @param    {number}  [options.offset=0 (The first object)] The offset from which to start retrieving albums.
 * @param    {string}  [options.market]                      An ISO 3166-1 alpha-2 country code or the string `from_token` in order to apply [Track Relinking]{@link https://developer.spotify.com/documentation/general/guides/track-relinking-guide}
 *
 * @returns  {Promise}
 * @resolves {object}                                        The album objects from the current user's library from Spotify
 * @rejects  {Error}                                         The error which caused the failure
 */
async function getMySavedAlbums(
  options: Options,
) {
  try {
    const url: string = 'v1/me/albums';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getMySavedAlbums;