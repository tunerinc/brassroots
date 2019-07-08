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

type Response = CursorPaging | SpotifyError;
type Options = {
  +limit?: number,
  +after?: string,
  +before?: string,
};

/**
 * Returns the most recent tracks played by the current user. Note that a track currently playing will not be visible in play history until it has completed. A track must be played for more than 30 seconds to be included in play history.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getMyRecentTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-recently-played}
 * 
 * @param    {object}  options            The options to use for the request
 * @param    {number}  [options.limit=20] The limit of recent tracks to retrieve from Spotify
 * @param    {number}  [options.after]    A Unix timestamp in ms. Returns all items after (but not including) this cursor position. If `after` is specified, `before` must not be specified.
 * @param    {number}  [options.before]   A Unix timestamp in ms. Returns all items before (but not including) this cursor position. If `before` is specified, `after` must not be specified.
 * 
 * @returns  {Promise}
 * @resolves {object}                     The current user's recent tracks
 * @rejects  {Error}                      The error which caused the failure
 */
async function getMyRecentTracks(
  options: Options,
) {
  try {
    const url: string = 'v1/me/player/recently-played';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getMyRecentTracks;