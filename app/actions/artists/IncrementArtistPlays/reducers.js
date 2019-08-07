'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementArtistPlaysReducers
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
 * Confirms the success of incrementing the amount of plays for the current user on a single artist
 * 
 * @function increment
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state               The Redux state
 * @param   {object}   action              The Redux action
 * @param   {string}   action.type         The type of Redux action
 * @param   {string[]} action.artists      The Spotiy ids of the artists to increment
 * @param   {number[]} action.artistCounts The new play counts for the artists
 * @param   {number}   action.artistCount  The new amount of plays for the current user on a single artist
 * 
 * @returns {object}                       The state with the new play count added to the single artist
 */
export function increment(
  state: Artist,
  action: Action,
): Artist {
  const {artistCount: userPlays} = action;
  const updates = typeof userPlays === 'number'
    ? {userPlays}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to increment the amount of plays for the current user on artists
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
 * Confirms the success of incrementing the amount of plays for the current user on artists
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the incrementingCount prop updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {incrementingCount: false, error: null});
}

/**
 * Adds the error which caused the increment artist plays failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the increment artist plays failure
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