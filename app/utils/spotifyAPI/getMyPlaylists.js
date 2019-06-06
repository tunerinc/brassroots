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
};

/**
 * Get a list of the playlists owned or followed by the current Spotify user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getMyPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-a-list-of-current-users-playlists}
 *
 * @param    {object}  options                               The options to use for the request
 * @param    {number}  [options.limit=20]                    The limit of playlists to retrieve from the current user's library
 * @param    {number}  [options.offset=0 (The first object)] The offset from which to start retrieving playlists
 *
 * @returns  {Promise}
 * @resolves {object}                                        The playlist objects of the current user from Spotify
 * @rejects  {Error}                                         The error which caused the failure
 */
async function getMyPlaylists(
  options: Options,
) {
  try {
    const url: string = 'v1/me/playlists';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getMyPlaylists;