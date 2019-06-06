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
 * Replace the image used to represent a specific playlist
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function uploadCustomPlaylistCoverImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/upload-custom-playlist-cover/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-upload-custom-playlist-cover}
 * 
 * @param    {string}  playlistID The Spotify playlist id to change the cover image for
 * @param    {string}  image      A Base64 encoded image to set as the new cover image. Max payload size is 256KB.
 * 
 * @returns  {Promise}
 * @resolves {object}             Confirmation the request was successful
 * @rejects  {Error}              The error which caused the failure
 */
async function uploadCustomPlaylistCoverImage(
  playlistID: string,
  image: string,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/images`;
    return await Spotify.sendRequest(url, 'PUT', image, true);
  } catch (err) {
    return err;
  }
}

module.exports = uploadCustomPlaylistCoverImage;