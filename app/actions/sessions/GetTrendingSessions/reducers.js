'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTrendingSessionsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to get the sessions trending on Brassroots
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the fetchingSessions & refreshing props updated
 */
export function request(
  state: State,
): State {
  const {explore} = state;
  const updates = explore && Array.isArray(explore.trendingSessions)
    ? {
      refreshingSessions: explore.trendingSessions.length !== 0,
      fetchingSessions: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the sessions trending on Brassroots
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                       The Redux state
 * @param   {object}   action                      The Redux action
 * @param   {string}   action.type                 The type of Redux action
 * @param   {string[]} action.trendingSessions    The Brassroots ids of the trending sessions
 * @param   {boolean}  action.trendingCanPaginate Whether the current user can paginate the trending sessions
 * 
 * @returns {object}                               The state with the trending sessions added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {explore} = state;
  const {trendingSessions, trendingCanPaginate} = action;
  const updates = explore && Array.isArray(trendingSessions) && typeof trendingCanPaginate === 'boolean'
    ? {
      refreshingSessions: false,
      fetchingSessions: false,
      error: null,
      explore: updateObject(explore, {
        trendingSessions,
        trendingCanPaginate,
        trendingLastUpdated: lastUpdated,
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get trending sessions failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get trending sessions failure
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