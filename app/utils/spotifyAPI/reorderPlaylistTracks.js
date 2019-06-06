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
  +range_start: number,
  +range_length?: number,
  +insert_before?: number,
  +snapshot_id?: string,
};

/**
 * Reorder a track or a group of tracks in a playlist.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function reorderPlaylistTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/reorder-playlists-tracks/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-reorder-playlists-tracks}
 *
 * @param    {string}  playlistID               The Spotify playlist id to reorder tracks of.
 * @param    {object}  options                  The tracks to be reordered and where to reorder them to.
 * @param    {number}  options.range_start      The position of the first track to be reordered
 * @param    {number}  [options.range_length=1] The amount of tracks to be reordered. Defaults to 1.
 * @param    {number}  [options.insert_before]  The position where the tracks should be inserted.
 * @param    {string}  [options.snapshot_id]    The playlist's snapshot ID against which you want to make changes.
 *
 * @returns  {Promise}
 * @resolves {object}                          The playlist with the tracks reordered
 * @rejects  {Error}                           The error which caused the failure
 */
async function reorderPlaylistTracks(
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

module.exports = reorderPlaylistTracks;