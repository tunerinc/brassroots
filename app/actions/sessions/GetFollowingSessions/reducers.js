'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetFollowingSessionsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to get sessions of the following of the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingSessions prop updated
 */
export function request(
  state: State,
): State {
  const {explore} = state;
  const updates = explore && Array.isArray(explore.followingSessions)
    ? {
      refreshingSessions: explore.followingSessions.length !== 0,
      fetchingSessions: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the sessions of the following of the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                       The Redux state
 * @param   {object}   action                      The Redux action
 * @param   {string}   action.type                 The type of Redux action
 * @param   {string[]} action.followingSessions    The Brassroots ids of the following sessions
 * @param   {boolean}  action.followingCanPaginate Whether the current user can paginate the following sessions
 * 
 * @returns {object}                               The state with the following sessions added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {explore} = state;
  const {followingSessions, followingCanPaginate} = action;
  const updates = explore && Array.isArray(followingSessions) && typeof followingCanPaginate === 'boolean'
    ? {
      refreshingSessions: false,
      fetchingSessions: false,
      error: null,
      explore: updateObject(explore, {
        followingSessions,
        followingCanPaginate,
        followingLastUpdated: lastUpdated,
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get following sessions failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get following sessions failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, refreshingSessions: false, fetchingSessions: false});
}