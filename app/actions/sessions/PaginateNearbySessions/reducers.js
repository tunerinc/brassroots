'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PaginateNearbySessionsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated as nearbyLastUpdated,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to paginate the sessions nearby the current user
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
 * Confirms the success of paginating the sessions nearby the current user's location
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                    The Redux state
 * @param   {object}   action                   The Redux action
 * @param   {string}   action.type              The type of Redux action
 * @param   {string[]} action.sessions          The Brassroots ids of the sessions nearby the current user
 * @param   {boolean}  action.nearbyCanPaginate Whether the nearby sessions can paginate
 * 
 * @returns {object}                            The state with the nearby sessions added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {explore} = state;
  const {sessions, nearbyCanPaginate} = action;
  const updates = (
    explore
    && Array.isArray(explore.nearbySessions)
    && Array.isArray(sessions)
    && typeof nearbyCanPaginate === 'boolean'
  )
    ? {
      paginatingSessions: false,
      error: null,
      explore: updateObject(explore, {
        nearbyCanPaginate,
        nearbyLastUpdated,
        nearbySessions: explore.nearbySessions.concat(...sessions),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the paginate nearby sessions failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the paginate nearby sessions failure
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