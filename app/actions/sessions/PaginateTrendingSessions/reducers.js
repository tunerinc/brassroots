'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PaginateTrendingSessionsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated as trendingLastUpdated,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to paginate the sessions trending on Brassroots
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the paginatingSessions prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {paginatingSessions: true, error: null});
}

/**
 * Confirms the success of paginating the sessions trending on Brassroots
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                      The Redux state
 * @param   {object}   action                     The Redux action
 * @param   {string}   action.type                The type of Redux action
 * @param   {string[]} action.sessions            The Brassroots ids of the sessions trending on the app
 * @param   {boolean}  action.trendingCanPaginate Whether the trending sessions can paginate
 * 
 * @returns {object}                              The state with the trending sessions added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {explore} = state;
  const {sessions, trendingCanPaginate} = action;
  const updates = (
    explore
    && Array.isArray(explore.trendingIDs)
    && Array.isArray(sessions)
    && typeof trendingCanPaginate === 'boolean'
  )
    ? {
      paginatingSessions: false,
      error: null,
      explore: updateObject(explore, {
        trendingCanPaginate,
        trendingLastUpdated,
        trendingIDs: [...explore.trendingIDs, ...sessions],
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the paginate trending sessions failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the paginate trending sessions failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, paginatingSessions: false});
}