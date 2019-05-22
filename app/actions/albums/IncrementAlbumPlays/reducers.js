'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementAlbumPlaysReducers
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
 * Confirms the success of incrementing the amount of plays for the current user on a single album
 * 
 * @function increment
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state             The Redux state
 * @param   {object} action            The Redux action
 * @param   {string} action.type       The type of Redux action
 * @param   {string} action.albumID    The Spotify id of the album to increment
 * @param   {number} action.albumCount The new total amount of plays for the current user on a single album
 * 
 * @returns {object}                   The state of the single album with the new amount of plays
 */
export function increment(
  state: Album,
  action: Action,
): Album {
  const {albumCount: userPlays} = action;
  const updates = typeof userPlays === 'number'
    ? {userPlays}
    : {};

  return updateObject(state, updates);
}

/**
 * Starts the request to increment the total amount of plays for the current user on a single album
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
 * Confirms the success of incrementing the amount of plays for the current user on a single album
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state             The Redux state
 * @param   {object} action            The Redux action
 * @param   {string} action.type       The type of Redux action
 * @param   {string} action.albumID    The Spotify id of the album to increment
 * @param   {number} action.albumCount The new total amount of plays for the current user on the album
 * 
 * @returns {object}                   The state with the new play count added for the single album
 */
export function success(
  state: State,
  action: Action,
): State {
  const {albumsByID: oldAlbums} = state;
  const {albumID} = action;
  const updates = typeof albumID === 'string' && typeof oldAlbums === 'object'
    ? {
      lastUpdated,
      incrementingCount: false,
      error: null,
      albumsByID: updateObject(oldAlbums, {
        [albumID]: singleAlbum(oldAlbums[albumID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the increment album plays failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the increment album plays failure
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