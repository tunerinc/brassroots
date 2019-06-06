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
  +position_ms: number,
  +device_id?: string,
};

/**
 * Seeks to the given position in the user’s currently playing track.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function seekCurrentlyPlayingTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/player/seek-to-position-in-currently-playing-track/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-seek-to-position-in-currently-playing-track}
 *
 * @param    {object}  options             The options to use for the request
 * @param    {number}  options.position_ms The track position in ms from which to start playback.
 * @param    {string}  [options.device_id] The device id the command is targeting.
 *
 * @returns  {Promise}
 * @resolves {object}                      The player object with the track playing from the new position from Spotify
 * @rejects  {Error}                       The error which caused the failure
 */
async function seekCurrentlyPlayingTrack(
  options: Options,
) {
  try {
    const url: string = `v1/me/player/seek`;
    return await Spotify.sendRequest(url, 'PUT', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = seekCurrentlyPlayingTrack;