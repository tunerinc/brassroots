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
  +volume_percent: number,
  +device_id?: string,
};

/**
 * Set the volume for the user’s current playback device.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function setVolumePlayback
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/player/set-volume-for-users-playback/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-set-volume-for-users-playback}
 *
 * @param    {object}  options                The options to use for the request
 * @param    {number}  options.volume_percent The volume percent from 0-100 to change the volume to.
 * @param    {string}  [options.device_id]    The device id the command is targeting.
 *
 * @returns  {Promise}
 * @resolves {object}                         The player object with the new volume from Spotify
 * @rejects  {Error}                          The error which caused the failure
 */
async function setVolumePlayback(
  options: Options,
) {
  try {
    const url: string = 'v1/me/player/volume';
    return await Spotify.sendRequest(url, 'PUT', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = setVolumePlayback;