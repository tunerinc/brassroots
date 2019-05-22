'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopTracksReducers
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
 * Confirms the success of getting the top tracks of a single artist
 * 
 * @function addTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state           The Redux state of the single artist
 * @param   {object}   action          The Redux action
 * @param   {string}   action.type     The type of Redux action
 * @param   {string}   action.artistID The Spotify id of the artist
 * @param   {string[]} action.trackIDs The top tracks of the artist and their Spotify ids
 * 
 * @returns {object}                   The state of the single artist with the top tracks updated
 */
export function addTracks(
  state: Artist,
  action: Action,
): Artist {
  const {trackIDs: topTracks} = action;
  const updates = Array.isArray(topTracks)
    ? {topTracks, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top tracks of a single artist
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
 * Confirms the success of getting the top tracks of a single artist
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state           The Redux state
 * @param   {object}   action          The Redux action
 * @param   {string}   action.type     The type of Redux action
 * @param   {string}   action.artistID The Spotify id of the artist
 * @param   {string[]} action.trackIDs The top tracks of the artist and their Spotify ids
 * 
 * @returns {object}                   The state with the artist's top tracks updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {artistsByID: oldArtists} = state;
  const {artistID} = action;
  const updates = typeof artistID === 'string' && typeof oldArtists === 'object'
    ? {
      fetchingTracks: false,
      error: null,
      artistsByID: updateObject(oldArtists, {
        [artistID]: singleArtist(oldArtists[artistID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get artist top tracks failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get artist top tracks failure
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