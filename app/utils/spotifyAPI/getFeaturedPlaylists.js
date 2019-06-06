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
  type Paging,
  type SpotifyError,
} from './types';

type Response = Playlists | SpotifyError;
type Options = {
  +locale?: string,
  +country?: string,
  +timestamp?: string,
  +limit?: number,
  +offset?: number,
};

type Playlists = {
  +message: string,
  +playlists: Paging,
};

/**
 * Get a list of Spotify featured playlists.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getFeaturedPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/browse/get-list-featured-playlists/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-featured-playlists}
 * 
 * @param    {object}  options                The options to use for the request
 * @param    {string}  [options.locale=en_US] The desired language's ISO 639-1 language code to retrieve playlists in
 * @param    {string}  [options.country]      A country's ISO 3166-1 alpha-2 country code from which to retrieve relevant playlists
 * @param    {string}  [options.timestamp]    The user's current time to tailor playlists for specific time/date
 * @param    {number}  [options.limit=20]     The limit of featured playlists to retrieve
 * @param    {number}  [options.offset=0]     The offset from which to start retrieving featured playlists
 *
 * @returns  {Promise}
 * @resolves {object}                         The featured playlist objects from Spotify
 * @rejects  {Error}                          The error which caused the failure
 */
async function getFeaturedPlaylists(
  options: Options,
) {
  try {
    const url: string = 'v1/browse/featured-playlists';
    return await Spotify.sendRequest(url, 'GET', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = getFeaturedPlaylists;