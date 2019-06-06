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
  +locale?: string,
  +limit?: number,
  +offset?: number,
};

/**
 * Get a list of categories used to tag items in Spotify
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getCategoryList
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/browse/get-list-categories/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-categories}
 * 
 * @param    {object}  options                               The options to use for the request
 * @param    {string}  [options.country]                     An ISO 3166-1 alpha-2 country code for retrieval of relevant items.
 * @param    {string}  [options.locale=en_US]                The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code, joined by an underscore.
 * @param    {number}  [options.limit=20]                    The limit of lists of categories to retrieve from Spotify
 * @param    {number}  [options.offset=0 (The first object)] The offset from which to start retrieving lists of categories
 * 
 * @returns  {Promise}
 * @resolves {object}                                        The list of categories retrieved from Spotify
 * @rejects  {Error}                                         The error which caused the failure
 */
async function getCategoryList(
  options: Options,
) {
  try {
    const url: string = 'v1/browse/categories';
    return await Spotify.sendRequest(url, 'GET', options, false);
  } catch (err) {
    return err;
  }
}

module.exports = getCategoryList;