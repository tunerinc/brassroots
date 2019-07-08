'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetMostPlayedSpotifyTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a get most played spotify track request
 * 
 * @alias module:GetMostPlayedSpotifyTrack
 * @function getMostPlayedSpotifyTrackRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_MOST_PLAYED_SPOTIFY_TRACK_REQUEST
 */
export function getMostPlayedSpotifyTrackRequest(): Action {
  return {
    type: types.GET_MOST_PLAYED_SPOTIFY_TRACK_REQUEST,
  };
}

/**
 * Notify the app of a get most played spotify track success
 * 
 * @alias module:GetMostPlayedSpotifyTrack
 * @function getMostPlayedSpotifyTrackSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_MOST_PLAYED_SPOTIFY_TRACK_SUCCESS
 */
export function getMostPlayedSpotifyTrackSuccess(): Action {
  return {
    type: types.GET_MOST_PLAYED_SPOTIFY_TRACK_SUCCESS,
  };
}

/**
 * Notify the app of a get most played spotify track failure
 * 
 * @alias module:GetMostPlayedSpotifyTrack
 * @function getMostPlayedSpotifyTrackFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param  {Error}  error The error which caused the get most played spotify track failure
 *
 * @return {object}       Redux action with the type of GET_MOST_PLAYED_SPOTIFY_TRACK_FAILURE and the error which caused the failure
 */
export function getMostPlayedSpotifyTrackFailure(
  error: Error,
): Action {
  return {
    type: types.GET_MOST_PLAYED_SPOTIFY_TRACK_FAILURE,
    error,
  };
}