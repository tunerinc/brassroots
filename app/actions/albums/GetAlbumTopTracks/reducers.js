'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetAlbumTopTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleAlbum,
  lastUpdated,
  type Album,
  type Action,
  type State,
} from '../../../reducers/albums';

/**
 * Confirms the success of getting the top tracks of a single album
 * 
 * @function addTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state           The Redux state for the single album
 * @param   {object}   action          The Redux action
 * @param   {string}   action.type     The type of Redux action
 * @param   {string}   action.albumID     The Spotify id of the album
 * @param   {string[]} action.trackIDs The single album's top tracks and their Spotify ids
 * 
 * @returns {object}                   The state of the single album with the top tracks updated
 */
export function addTracks(
  state: Album,
  action: Action,
): Album {
  const {trackIDs: topTracks} = action;
  const updates = Array.isArray(topTracks)
    ? {topTracks, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top tracks of a single album
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingTracks prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingTracks: true, error: null});
}

/**
 * Confirms the success of getting the top tracks of a single album
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingTracks prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {fetchingTracks: false, error: null});
}

/**
 * Adds the error which caused the get album top tracks failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get album top tracks failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingTracks: false});
}