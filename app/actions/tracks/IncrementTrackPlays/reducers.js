'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementTrackPlaysReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleTrack,
  lastUpdated,
  type Track,
  type Action,
  type State,
} from '../../../reducers/tracks';

/**
 * Confirms the success of incrementing the amount of plays for the current user on a single track
 * 
 * @function increment
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state             The Redux state
 * @param   {object} action            The Redux action
 * @param   {string} action.type       The type of Redux action
 * @param   {string} action.trackID    The Spotify id of the track to increment
 * @param   {number} action.trackCount The new total amount of plays for the current user on a single track
 * 
 * @returns {object}                   The state of the single track with the new total amount of plays
 */
export function increment(
  state: Track,
  action: Action,
): Track {
  const {trackCount: userPlays} = action;
  const updates = typeof userPlays === 'number'
    ? {userPlays, lastUpdated}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to increment the play count for the current user on a track
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the incrementingCount prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {incrementingCount: true, error: null});
}

/**
 * Confirms the success of incrementing the play count for the current user on a track
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state             The Redux state
 * @param   {object} action            The Redux action
 * @param   {string} action.type       The type of Redux action
 * @param   {string} action.trackID    The Spotify id of the track with the new play count
 * @param   {number} action.trackCount The new play count for the track
 * 
 * @returns {object}                   The state with the play count updated for the single track
 */
export function success(
  state: State,
  action: Action,
): State {
  const {tracksByID} = state;
  const {trackID} = action;
  const updates = typeof tracksByID === 'object' && typeof trackID === 'string'
    ? {
      lastUpdated,
      incrementingCount: false,
      error: null,
      tracksByID: updateObject(tracksByID, {
        [trackID]: singleTrack(tracksByID[trackID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the increment track plays failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the increment track plays failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, incrementingCount: false});
}