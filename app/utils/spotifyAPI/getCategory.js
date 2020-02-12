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
  type Category,
  type SpotifyError,
} from './types';

type Response = Category | SpotifyError;
type Options = {
  +country?: string,
  +locale?: string,
};

/**
 * Get a single category used to tag items in Spotify
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getCategory
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/browse/get-category/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-a-category}
 *
 * @param    {string}  categoryID             The Spotify category id to retrieve.
 * @param    {object}  options                The options to use for the request
 * @param    {string}  [options.country]      A country's ISO 3166-1 alpha-2 country code to ensure the category exists
 * @param    {string}  [options.locale=en_US] The desired language's ISO 639-1 language code to retrieve the category strings in
 *
 * @returns  {Promise}
 * @resolves {object}                         The category object from Spotify
 * @rejects  {Error}                          The error which caused the failure
 */
async function getCategory(
  categoryID: string,
  options: Options,
) {
  try {
    const url: string = `v1/browse/categories/${categoryID}`;
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getCategory;