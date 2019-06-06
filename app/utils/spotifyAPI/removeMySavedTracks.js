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
  ids: Array<string>,
};

/**
 * Remove one or more tracks from the current user’s “Your Music” library.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function removeMySavedTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/library/remove-tracks-user/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-remove-tracks-user}
 *
 * @param    {object}   options     The options to use for the request
 * @param    {string[]} options.ids A list of Spotify track ids to remove from the current user's library.
 *
 * @returns  {Promise}
 * @resolves {object}               The removed track objects from the current user's library from Spotify
 * @rejects  {Error}                The error which caused the failure
 */
async function removeMySavedTracks(
  options: Options,
) {
  try {
    const url: string = 'v1/me/tracks';
    return await Spotify.sendRequest(url, 'DELETE', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = removeMySavedTracks;