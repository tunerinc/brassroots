'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopAlbums
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artist top albums request
 * 
 * @alias module:GetArtistTopAlbums
 * @function getArtistTopAlbumsRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_ALBUMS_REQUEST
 */
export function getArtistTopAlbumsRequest(): Action {
  return {
    type: types.GET_ARTIST_TOP_ALBUMS_REQUEST,
  };
}

/**
 * Notify the app of a get artist top albums success
 * 
 * @alias module:GetArtistTopAlbums
 * @function getArtistTopAlbumsSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string}   artistID  The Spotify id of the artist
 * @param   {string[]} topAlbums The artist's top Spotify album ids
 * 
 * @returns {object}             Redux action with the type of GET_ARTIST_TOP_ALBUMS_SUCCESS and the top albums for the artist
 */
export function getArtistTopAlbumsSuccess(
  artistID: string,
  topAlbums: Array<string>,
): Action {
  return {
    type: types.GET_ARTIST_TOP_ALBUMS_SUCCESS,
    artistID,
    topAlbums,
  };
}

/**
 * Notify the app of a get artist top albums failure
 * 
 * @alias module:GetArtistTopAlbums
 * @function getArtistTopAlbumsFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the get artist top albums failure
 * 
 * @returns {object}       Redux action with the type of GET_ARTIST_TOP_ALBUMS_FAILURE and the error which caused the failure
 */
export function getArtistTopAlbumsFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_TOP_ALBUMS_FAILURE,
    error,
  };
}