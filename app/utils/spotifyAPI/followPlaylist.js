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
  +public: boolean,
};

/**
 * Follows a Spotify playlist for the current user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function followPlaylist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-follow-playlist}
 *
 * @param    {string}  playlistID            The Spotify playlist id to be followed.
 * @param    {object}  options               The options to use for the request
 * @param    {boolean} [options.public=true] Whether the followed playlist is public on the user's profile or not
 *
 * @returns  {Promise}
 * @resolves {object}                        Confirmation the playlist was successfully followed
 * @rejects  {Error}                         The error which caused the failure
 */
async function followPlaylist(
  playlistID: string,
  options: Options,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/followers`;
    return await Spotify.sendRequest(url, 'PUT', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = followPlaylist;