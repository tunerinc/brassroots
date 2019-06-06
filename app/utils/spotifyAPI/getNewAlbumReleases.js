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

type Response = AlbumReleases | SpotifyError;
type Options = {
  +country: string,
  +limit?: number,
  +offset?: number,
};

type AlbumReleases = {
  +message: string,
  +albums: Paging,
};

/**
 * Get a list of new album releases featured in Spotify.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getNewAlbumReleases
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/browse/get-list-new-releases/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-new-releases}
 *
 * @param    {object}  options                               The options to use for the request
 * @param    {string}  options.country                       An ISO 3166-1 alpha-2 country code to retrieve relevant albums from
 * @param    {number}  [options.limit=20]                    The limit of new album releases to be retrieved.
 * @param    {number}  [options.offset=0 (The first object)] The offset from which to start retrieving new album releases.
 *
 * @returns  {Promise}
 * @resolves {object}                                        The new album release objects from Spotify
 * @rejects  {Error}                                         The error which caused the failure
 */
async function getNewAlbumReleases(
  options: Options,
) {
  try {
    const url: string = 'v1/browse/new-releases';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getNewAlbumReleases;