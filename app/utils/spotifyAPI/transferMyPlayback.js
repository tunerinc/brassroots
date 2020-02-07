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
  +device_ids: Array<string>,
  +play?: boolean,
};

/**
 * Transfer playback to a new device and determine if it should start playing.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function transferMyPlayback
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-transfer-a-users-playback}
 *
 * @param    {object}   options            The options to use for the request
 * @param    {string[]} options.device_ids Contains the single Spotify device id to transfer playback to
 * @param    {boolean}  [options.play]     The playback state for the transferred device where `true` ensures playback and `false` keeps current playback state
 *
 * @returns  {Promise}
 * @resolves {object}                      The device where playback was transferred
 * @rejects  {Error}                       The error which caused the failure
 */
async function transferMyPlayback(
  options: Options,
) {
  try {
    const url: string = 'v1/me/player';
    return await Spotify.sendRequest(url, 'PUT', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = transferMyPlayback;