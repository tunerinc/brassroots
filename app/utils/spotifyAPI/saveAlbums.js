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

type Response = empty | SpotifyError;
type Options = {
  +ids: Array<string>,
};

/**
 * Save one or more albums to the current user’s “Your Music” library.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function saveAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/library/save-albums-user/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-save-albums-user}
 *
 * @param    {object}   options     The options to use for the request
 * @param    {string[]} options.ids A list of Spotify album ids to save to the current user's library.
 *
 * @returns  {Promise}
 * @resolves {object}               The album objects saved to the current user's library from Spotify
 * @rejects  {Error}                The error which caused the failure
 */
async function saveAlbums(
  options: Options,
) {
  try {
    const url: string = 'v1/me/albums';
    return await Spotify.sendRequest(url, 'PUT', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = saveAlbums;