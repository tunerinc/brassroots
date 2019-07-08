'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopListenersReducers
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
 * Confirms the success of getting the top listeners of a single artist
 * 
 * @function addListeners
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state            The Redux state of the single artist
 * @param   {object}   action           The Redux action
 * @param   {string}   action.type      The type of Redux action
 * @param   {string}   action.artistID  The Spotify id of the artist
 * @param   {string[]} action.listeners The top listeners of the artist and their user ids
 * 
 * @returns {object}                    The state of the single artist with the top listeners updated
 */
export function addListeners(
  state: Artist,
  action: Action,
): Artist {
  const {listeners: topListeners} = action;
  const updates = Array.isArray(topListeners)
    ? {topListeners, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to get the top listeners of a single artist
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingListeners prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {fetchingListeners: true, error: null});
}

/**
 * Confirms the success of getting the top listeners of a single artist
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state            The Redux state
 * @param   {object}   action           The Redux action
 * @param   {string}   action.type      The type of Redux action
 * @param   {string}   action.artistID  The Spotify id of the artist
 * @param   {string[]} action.listeners The top listeners of the artist and their user ids
 * 
 * @returns {object}                    The state with the artist's top listeners updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {artistsByID: oldArtists} = state;
  const {artistID} = action;
  const updates = typeof artistID === 'string' && typeof oldArtists === 'object'
    ? {
      fetchingListeners: false,
      error: null,
      artistsByID: updateObject(oldArtists, {
        [artistID]: singleArtist(oldArtists[artistID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get artist top listeners failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get artist top listeners failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingListeners: false});
}