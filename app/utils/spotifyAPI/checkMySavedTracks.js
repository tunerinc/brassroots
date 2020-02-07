'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SpotifyAPI
 */

import Spotify from 'rn-spotify-sdk';
import {type SpotifyError} from './types';

type Response = Array<boolean> | SpotifyError;
type Options = {
  +ids: Array<string>,
};

/**
 * Check if one or more tracks is already saved in the current Spotify user’s “Your Music” library.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function checkMySavedTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-tracks/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-check-users-saved-tracks}
 *
 * @param    {object}    options     The options to use for the request
 * @param    {string[]}  options.ids A list of tracks to check if in current user's library.
 *
 * @returns  {Promise}
 * @resolves {boolean[]}             The status of the tracks being in the current user's library on Spotify
 * @rejects  {Error}                 The error which caused the failure
 */
async function checkMySavedTracks(
  options: Options,
) {
  try {
    const url: string = 'v1/me/tracks/contains';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = checkMySavedTracks;