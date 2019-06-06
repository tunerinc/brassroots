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

/**
 * Unfollows a Spotify playlist for the current user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function unfollowPlaylist
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-playlist/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-unfollow-playlist}
 *
 * @param    {string}  playlistID The Spotify playlist id of the playlist to unfollow.
 *
 * @returns  {Promise}
 * @resolves {object}             Confirmation the Spotify playlist was unfollowed
 * @rejects  {Error}              The error which caused the failure
 */
async function unfollowPlaylist(
  playlistID: string,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/followers`;
    return await Spotify.sendRequest(url, 'DELETE', {}, true);
  } catch (err) {
    return err;
  }
}

module.exports = unfollowPlaylist;