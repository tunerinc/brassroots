'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddUserRecentTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleUser,
  type User,
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Adds the recently played Spotify track id to the current user
 * 
 * @function addSingleRecentTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.trackID The Spotify id of the recent track
 * 
 * @returns {object}                The state of the current user with the recent track added
 */
export function addSingleRecentTrack(
  state: User,
  action: Action,
): User {
  const {recentlyPlayed: tracks} = state;
  const {trackID} = action;
  const updates = Array.isArray(tracks) && typeof trackID === 'string'
    ? {recentlyPlayed: [trackID, ...tracks.filter(el => el !== trackID)]}
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the Spotify id of the track recently played by the current user
 * 
 * @function addUserRecentTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.trackID The Spotify id of the recent track
 * 
 * @returns {object}                The state with the current user's recent track added
 */
export function addUserRecentTrack(
  state: State,
  action: Action,
): State {
  const {currentUserID, usersByID} = state;
  const updates = typeof currentUserID === 'string' && typeof usersByID === 'object'
    ? {
      usersByID: updateObject(usersByID, {
        [currentUserID]: singleUser(usersByID[currentUserID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}