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
  +uris: Array<string>,
};

/**
 * Replace all the tracks in a playlist, overwriting its existing tracks. This powerful request can be useful for replacing tracks, re-ordering existing tracks, or clearing the playlist.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function replacePlaylistTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/replace-playlists-tracks/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-replace-playlists-tracks}
 *
 * @param    {string}   playlistID   The Spotify playlist id to replace tracks of.
 * @param    {object}   options      The options to use for the request
 * @param    {string[]} options.uris A list of Spotify track uris to replace the playlist with.
 *
 * @returns  {Promise}
 * @resolves {object}                The playlist with the added tracks
 * @rejects  {Error}                 The error which caused the failure
 */
async function replacePlaylistTracks(
  playlistID: string,
  options: Options,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/tracks`;
    return await Spotify.sendRequest(url, 'PUT', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = replacePlaylistTracks;