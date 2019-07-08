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
  type Devices,
  type SpotifyError,
} from './types';

type Response =  Devices | SpotifyError;

/**
 * Get information about a user’s available devices.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getMyAvailableDevices
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/player/get-a-users-available-devices/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-a-users-available-devices}
 *
 * @returns  {Promise}
 * @resolves {object}  The available device objects from Spotify
 * @rejects  {Error}   The error which caused the failure
 */
async function getMyAvailableDevices() {
  try {
    const url: string = 'v1/me/player/devices';
    return await Spotify.sendRequest(url, 'GET', {}, true);
  } catch (err) {
    return err;
  }
}

module.exports = getMyAvailableDevices;