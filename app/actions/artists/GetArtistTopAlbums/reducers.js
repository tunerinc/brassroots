'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopAlbumsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleArtist,
  lastUpdated,
  type Artist,
  type Action,
  type State,
} from '../../../reducers/artists';

/**
 * Confirms the success of getting the top albums of a single artist
 * 
 * @function addAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state            The Redux state of the single artist
 * @param   {object}   action           The Redux action
 * @param   {string}   action.type      The type of Redux action
 * @param   {string}   action.artistID  The Spotify id of the artist
 * @param   {string[]} action.topAlbums The top albums of the artist and their Spotify ids
 * 
 * @returns {object}                    The state of the single artist with the top albums updated
 */
export function addAlbums(
  state: Artist,
  action: Action,
): Artist {
  const {topAlbums} = action;
  const updates = Array.isArray(topAlbums)
    ? {topAlbums, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top albums of a single artist
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingAlbums prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingAlbums: true, error: null});
}

/**
 * Confirms the success of getting the top albums of a single artist
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingAlbums prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {fetchingAlbums: false, error: null});
}

/**
 * Adds the error which caused the get artist top albums failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get artist top albums failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingAlbums: false});
}