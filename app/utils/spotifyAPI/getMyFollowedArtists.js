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
  type CursorPaging,
  type SpotifyError,
} from './types';

type Response = {artists: CursorPaging} | SpotifyError;
type Options = {
  +type: string,
  +limit?: number,
  +after?: string,
};

/**
 * Get the current user’s followed artists.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getMyFollowedArtists
 *
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-followed}
 *
 * @param    {object}  options             The options to use for the request
 * @param    {string}  options.type=artist The type of item to retrieve followed for
 * @param    {number}  [options.limit=20]  The limit of followed artists to be retrieved.
 * @param    {string}  [options.after]     The Spotify artist id from which to start retrieving followed artists
 *
 * @returns  {Promise}
 * @resolves {object}                      The followed artist objects of the user from Spotify
 * @rejects  {Error}                       The error which caused the failure
 */
async function getMyFollowedArtists(
  options: Options,
) {
  try {
    const url: string = 'v1/me/following';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getMyFollowedArtists;