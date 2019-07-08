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
  type PublicUser,
  type SpotifyError,
} from './types';

type Response = PublicUser | SpotifyError;

/**
 * Get public profile information about a Spotify user.
 * 
 * @async
 * @alias module:SpotifyAPI
 * @function getUserProfile
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @see [Spotify API Endpoint Reference]{@link https://developer.spotify.com/documentation/web-api/reference/users-profile/get-users-profile/}
 * @see [Spotify API Endpoint Reference Beta]{@link https://developer.spotify.com/documentation/web-api/reference-beta/#endpoint-get-users-profile}
 *
 * @param    {string}  userID The Spotify user id to retrieve profile information from.
 *
 * @returns  {Promise}
 * @resolves {object}         The user object of the user from Spotify
 * @rejects  {Error}          The error which caused the failure
 */
async function getUserProfile(
  userID: string,
) {
  try {
    const url: string = `v1/users/${userID}`;
    return await Spotify.sendRequest(url, 'GET', {}, true);
  } catch (err) {
    return err;
  }
}

module.exports = getUserProfile;