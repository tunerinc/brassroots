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
  type Image,
  type SpotifyError,
} from './types';

type Response = Array<Image> | SpotifyError;

/**
 * Get the current image associated with a specific playlist
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getPlaylistCoverImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist-cover/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-playlist-cover}
 * 
 * @param    {string}   playlistID The Spotify playlist id to get the cover image for
 * 
 * @returns  {Promise}
 * @resolves {object[]}            An array of the image objects for the specific playlist
 * @rejects  {Error}               The error which caused the failure
 */
async function getPlaylistCoverImage(
  playlistID: string,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/images`;
    return await Spotify.sendRequest(url, 'GET', {}, false);
  } catch (err) {
    return err;
  }
}

module.exports = getPlaylistCoverImage;