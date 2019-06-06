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

type Response = {snapshot_id: string} | SpotifyError;
type Options = {
  +uris: Array<string>,
  +position?: number,
};

/**
 * Add one or more tracks to a user’s playlist.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function addPlaylistTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/}
 * @see [Spotify API Endpoint Reference (Beta)]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-add-tracks-to-playlist}
 *
 * @param    {string}   playlistID         The Spotify playlist id to add tracks to.
 * @param    {object}   options            The options to use for the request
 * @param    {string[]} options.uris       A list of Spotify track uris to add to the playlist.
 * @param    {number}   [options.position] The position to insert the tracks
 *
 * @returns  {Promise}
 * @resolves {object}                      The playlist with the added tracks from Spotify
 * @rejects  {Error}                       The error which caused the failure
 */
async function addPlaylistTracks(
  playlistID: string,
  options: Options,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/tracks`;
    return await Spotify.sendRequest(url, 'POST', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = addPlaylistTracks;