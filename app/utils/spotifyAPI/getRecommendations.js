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
  type Recommendations,
  type SpotifyError,
} from './types';

type Response = Recommendations | SpotifyError;
type Options = {
  +seed_artists: Array<string>,
  +seed_genres: Array<string>,
  +seed_tracks: Array<string>,
  +limit?: number,
  +market?: string,

  // acousticness
  +max_acousticness?: number,
  +min_acousticness?: number,
  +target_acousticness?: number,

  // danceability
  +max_danceability?: number,
  +min_danceability?: number,
  +target_danceability?: number,

  // duration_ms
  +max_duration_ms?: number,
  +min_duration_ms?: number,
  +target_duration_ms?: number,

  // energy
  +max_energy?: number,
  +min_energy?: number,
  +target_energy?: number,

  // instrumentalness
  +max_instrumentalness?: number,
  +min_instrumentalness?: number,
  +target_instrumentalness?: number,

  // key
  +max_key?: number,
  +min_key?: number,
  +target_key?: number,

  // liveness
  +max_liveness?: number,
  +min_liveness?: number,
  +target_liveness?: number,

  // loudness
  +max_loudness?: number,
  +min_loudness?: number,
  +target_loudness?: number,

  // mode
  +max_mode?: number,
  +min_mode?: number,
  +target_mode?: number,

  // popularity
  +max_popularity?: number,
  +min_popularity?: number,
  +target_popularity?: number,

  // speechiness
  +max_speechiness?: number,
  +min_speechiness?: number,
  +target_speechiness?: number,

  // tempo
  +max_tempo?: number,
  +min_tempo?: number,
  +target_tempo?: number,

  // time_signature
  +max_time_signature?: number,
  +min_time_signature?: number,
  +target_time_signature?: number,

  // valence
  +max_valence?: number,
  +min_valence?: number,
  +target_valence?: number,
};

/**
 * Create a playlist-style listening experience based on seed artists, tracks and genres.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getRecommendations
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-recommendations}
 *
 * @param    {object}   options              The options to use for the request
 * @param    {number}   [options.limit=20]   The limit of recommendations to be retrieved.
 * @param    {string}   [options.market]     An ISO 3166-1 alpha-2 country code or the string `from_token` in order to apply [Track Relinking]{@link https://developer.spotify.com/documentation/general/guides/track-relinking-guide}
 * @param    {number}   [options.max_*]      The max value to allow for each tuneable track attribute
 * @param    {number}   [options.min_*]      The min value to allow for each tuneable track attribute
 * @param    {string[]} options.seed_artists An array of Spotify artist ids to seed.
 * @param    {string[]} options.seed_genres  An array of Spotify genre ids to seed.
 * @param    {string[]} options.seed_tracks  An array of Spotify track ids to seed.
 * @param    {number}   [options.target_*]   The target value for each tuneable track attribute
 *
 * @returns  {Promise}
 * @resolves {object}                        The recommended objects from Spotify
 * @rejects  {Error}                         The error which caused the failure
 */
async function getRecommendations(
  options: Options,
) {
  try {
    const url: string = 'v1/recommendations';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getRecommendations;