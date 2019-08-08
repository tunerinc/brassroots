'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetNearbySessionsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to get the sessions nearby to the current user
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
  const updates = explore && Array.isArray(explore.nearbyIDs)
    ? {
      refreshingSessions: explore.nearbyIDs.length !== 0,
      fetchingSessions: true,
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the sessions nearby to the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                    The Redux state
 * @param   {object}   action                   The Redux action
 * @param   {string}   action.type              The type of Redux action
 * @param   {string[]} action.nearbyIDs         The Brassroots ids of the nearby sessions
 * @param   {boolean}  action.nearbyCanPaginate Whether the current user can paginate the nearby sessions
 * 
 * @returns {object}                            The state with the nearby sessions added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {explore} = state;
  const {nearbyIDs, nearbyCanPaginate} = action;
  const updates = explore && Array.isArray(nearbyIDs) && typeof nearbyCanPaginate === 'boolean'
    ? {
      refreshingSessions: false,
      fetchingSessions: false,
      error: null,
      explore: updateObject(explore, {
        nearbyIDs,
        nearbyCanPaginate,
        nearbyLastUpdated: lastUpdated,
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused teh get nearby sessions failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get nearby sessions failure
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