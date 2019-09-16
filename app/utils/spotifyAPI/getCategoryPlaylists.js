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

type Response = Paging | SpotifyError;
type Options = {
  +country?: string,
  +limit?: number,
  +offset?: number,
};

/**
 * Get a list of Spotify playlists tagged with a particular category.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getCategoryPlaylists
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/browse/get-categorys-playlists/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-a-categories-playlists}
 *
 * @param    {string}  categoryID                            The Spotify category id to retrieve playlists of.
 * @param    {object}  options                               The options to use for the request
 * @param    {string}  [optionscountry]                      A country's ISO 3166-1 alpha-2 country code
 * @param    {number}  [options.limit=20]                    The limit of playlists to retrieve from the category
 * @param    {number}  [options.offset=0 (The first object)] The offset from which to start retrieving playlists
 *
 * @returns  {Promise}
 * @resolves {object}                                        The playlist objects of a category from Spotify
 * @rejects  {Error}                                         The error which caused the failure
 */
async function getCategoryPlaylists(
  categoryID: string,
  options: Options,
) {
  try {
    const url: string = `v1/browse/categories/${categoryID}/playlists`;
    return await Spotify.sendRequest(url, 'GET', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = getCategoryPlaylists;