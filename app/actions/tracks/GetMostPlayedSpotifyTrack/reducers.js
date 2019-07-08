'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetMostPlayedSpotifyTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Starts the request to get the current user's most played Spotify track to use as their first favorite track/cover image
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingFavoriteTrack prop updated
 */
export function request(state: State,
): State {
  return updateObject(state, {fetchingFavoriteTrack: true, error: null});
}

/**
 * Confirms the success of getting the current user's most played Spotify track
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingFavoriteTrack prop updated
 */
export function success(state: State,
): State {
  return updateObject(state, {lastUpdated, fetchingFavoriteTrack: false, error: null});
}

/**
 * Adds the error which caused the get most played spotify track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get most played spotify track failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingFavoriteTrack: false});
}