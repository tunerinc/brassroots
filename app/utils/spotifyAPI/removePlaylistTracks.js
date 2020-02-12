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
type TrackToRemove = {
  +uri: string,
  +position: number,
};

type Options = {
  +tracks: Array<TrackToRemove>,
};

/**
 * Remove one or more tracks from a user’s playlist.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function removePlaylistTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-remove-tracks-playlist}
 *
 * @param    {string}   playlistID                 The Spotify playlist id to delete tracks from.
 * @param    {object}   options                    The options to use for the request
 * @param    {object[]} options.tracks             A list of Spotify track uris to delete from the playlist.
 * @param    {string}   options.tracks[].uri       The Spotify track uri to remove from the playlist
 * @param    {number[]} options.tracks[].positions The specific positions of the tracks to remove from the playlist
 *
 * @returns  {Promise}
 * @resolves {object}                              The playlist with the tracks removed
 * @rejects  {Error}                               The error which caused the failure
 */
async function removePlaylistTracks(
  playlistID: string,
  options: Options,
) {
  try {
    const url: string = `v1/playlists/${playlistID}/tracks`;
    return await Spotify.sendRequest(url, 'DELETE', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = removePlaylistTracks;