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
  +time_range: string,
  +limit: number,
};

/**
 * Gets the top track for the current user from Spotify
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getUserTopTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-users-top-artists-and-tracks}
 *
 * @returns  {Promise}
 * @resolves {object}  The current user's top track from Spotify
 * @rejects  {Error}   The error which caused the failure
 */
async function getUserTopTrack() {
  try {
    const url: string = 'v1/me/top/tracks';
    const options: Options = {time_range: 'long_term', limit: 1};
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getUserTopTrack;