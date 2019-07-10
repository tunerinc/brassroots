'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Starts the request to get the current user's library tracks from Spotify
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state             The Redux state
 * @param   {object}  action            The Redux action
 * @param   {string}  action.type       The type of Redux action
 * @param   {boolean} action.refreshing Whether the current user is refreshing the tracks
 * 
 * @returns {object}                    The state with the refreshingTracks/fetchingTracks props updated
 */
export function request(
  state: State,
  action: Action,
): State {
  const {refreshing: refreshingTracks} = action;
  const updates = typeof refreshingTracks === 'boolean'
    ? {
      refreshingTracks,
      fetchingTracks: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the tracks from the current user's Spotify library
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state          The Redux state
 * @param   {object}   action         The Redux action
 * @param   {string}   action.type    The type of Redux action
 * @param   {string[]} action.tracks  The Spotify ids of the current user's library tracks
 * @param   {number}   action.total   The total number of tracks in the current user's library
 * @param   {boolean}  action.replace Whether or not all the tracks need to be replaced
 * 
 * @returns {object}                  The state with the library track ids added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {refreshingTracks, userTracks} = state;
  const {tracks, total, replace} = action;
  const updates = (
    typeof refreshingTracks === 'boolean'
    && typeof replace === 'boolean'
    && Array.isArray(userTracks)
    && Array.isArray(tracks)
  )
    ? {
      lastUpdated,
      totalUserTracks: total,
      refreshingTracks: false,
      fetchingTracks: false,
      error: null,
      userTracks: refreshingTracks || replace
        ? [...tracks]
        : [...userTracks, ...tracks].filter((el, i, arr) => i === arr.indexOf(el)),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get tracks failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get tracks failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, refreshingTracks: false, fetchingTracks: false});
}