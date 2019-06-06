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
 * Get a list of the playlists owned or followed by a Spotify user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getUserPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-list-users-playlists}
 *
 * @param    {string}  userID                                The Spotify user id to retrieve playlists from.
 * @param    {object}  options                               The options to use for the request
 * @param    {number}  [options.limit=20]                    The limit of playlists to retrieve 
 * @param    {number}  [options.offset=0 (The first object)] The offset from which to start retrieving playlists
 *
 * @returns  {Promise}
 * @resolves {object}                                        The playlist objects of the user from Spotify
 * @rejects  {Error}                                         The error which caused the failure
 */
async function getUserPlaylists(
  userID: string,
  options: Options,
) {
  try {
    const url: string = `v1/users/${userID}/playlists`;
    return await Spotify.sendRequest(url, 'GET', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = getUserPlaylists;