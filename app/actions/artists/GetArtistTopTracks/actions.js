'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopTracks
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artist top tracks request
 * 
 * @alias module:GetArtistTopTracks
 * @function getArtistTopTracksRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_TRACKS_REQUEST
 */
export function getArtistTopTracksRequest(): Action {
  return {
    type: types.GET_ARTIST_TOP_TRACKS_REQUEST,
  };
}

/**
 * Notify the app of a get artist top tracks success
 * 
 * @alias module:GetArtistTopTracks
 * @function getArtistTopTracksSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string}   artistID The artist id to get the top tracks of
 * @param   {string[]} trackIDs The top 3 most played Spotify track ids from the artist
 *
 * @returns {object}            Redux action with the type of GET_ARTIST_TOP_TRACKS_SUCCESS and the top artist track objects
 */
export function getArtistTopTracksSuccess(
  artistID: string,
  trackIDs: Array<string>,
): Action {
  return {
    type: types.GET_ARTIST_TOP_TRACKS_SUCCESS,
    artistID,
    trackIDs,
  };
}

/**
 * Notify the app of a get artist top tracks failure
 * 
 * @alias module:GetArtistTopTracks
 * @function getArtistTopTracksFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get artist top tracks failure
 *
 * @returns {object}       Redux action with the type of GET_ARTIST_TOP_TRACKS_FAILURE and the error which caused the failure
 */
export function getArtistTopTracksFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_TOP_TRACKS_FAILURE,
    error,
  };
}