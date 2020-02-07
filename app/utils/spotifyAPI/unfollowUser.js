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
 * Remove the current user as a follower of one or more other Spotify users
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function unfollowUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-artists-users/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-unfollow-artists-users}
 * 
 * @param    {object}   options     The options to use for the request
 * @param    {string[]} options.ids The Spotify user ids to unfollow for the current user
 * 
 * @returns  {Promise}
 * @resolves {object}               Confirmation the request was successful
 * @rejects  {Error}                The error which caused the failure
 */
async function unfollowUser(
  options: Options,
) {
  try {
    const url: string = `v1/me/following?type=user`;
    return await Spotify.sendRequest(url, 'DELETE', options, true);
  } catch (err) {
    return err;
  }
}

module.exports = unfollowUser;