'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type State,
  type Action,
} from '../../../reducers/artists';

/**
 * Starts the request to get the the current user's saved artists
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state The Redux state
 * 
 * @returns {object}        The state with the fetching/refreshing props updated
 */
export function request(
  state: State,
): State {
  const {fetching: oldFetch} = state;
  const fetching: Array<string> = Array.isArray(oldFetch) ? oldFetch.concat('artists') : ['artists'];
  return updateObject(state, {fetching, error: null});
}

/**
 * Confirms the success of getting the current user's saved artists
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state          The Redux state
 * @param   {object}   action         The Redux action
 * @param   {string}   action.type    The type of Redux action
 * @param   {string[]} action.artists The Spotify ids of the artists saved in the current user's library
 * 
 * @returns {object}                  The state with the current user's saved artists added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {fetching, userArtists: oldArtists} = state;
  const {artists} = action;
  const updates = Array.isArray(fetching) && Array.isArray(oldArtists) && Array.isArray(artists)
    ? {
      lastUpdated,
      userArtists: [...artists],
      totalUserArtists: artists.length,
      fetching: fetching.filter(t => t !== 'artists'),
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get artists failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get artists failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {fetching: old} = state;
  const {error} = action;
  const fetching: Array<string> = Array.isArray(old) ? old.filter(t => t !== 'artists') : [];
  return updateObject(state, {error, fetching});
}