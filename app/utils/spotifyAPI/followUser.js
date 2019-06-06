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
  +ids: Array<string>,
};

/**
 * Add the current user as a follower of one or more other Spotify users
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function followUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-follow-artists-users}
 * 
 * @param    {object}   options     The options to use for the request
 * @param    {string[]} options.ids The Spotify user ids to follow for the current user
 * 
 * @returns  {Promise}
 * @resolves {object}               Confirmation the request was successful
 * @rejects  {Error}                The error which caused the failure
 */
async function followUser(
  options: Options,
) {
  try {
    const url: string = `v1/me/following?type=user`;
    return await Spotify.sendRequest(url, 'PUT', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = followUser;