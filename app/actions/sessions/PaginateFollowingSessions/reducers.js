'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PaginateFollowingSessionsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated as followingLastUpdated,
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Starts the request to pagiante the sessions of the current user's following
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
 * Confirms the success of paginating the sessions of the current user's following
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                       The Redux state
 * @param   {object}   action                      The Redux action
 * @param   {string}   action.type                 The type of Redux action
 * @param   {string[]} action.sessions             The Brassroots ids of the following sessions
 * @param   {boolean}  action.followingCanPaginate Whether the following sessions can paginate
 * 
 * @returns {object}                               The state with the paginated following sessions added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {explore} = state;
  const {sessions, followingCanPaginate} = action;
  const updates = (
    explore
    && Array.isArray(explore.followingSessions)
    && Array.isArray(sessions)
    && typeof followingCanPaginate === 'boolean'
  )
    ? {
      paginatingSessions: false,
      error: null,
      explore: updateObject(explore, {
        followingCanPaginate,
        followingLastUpdated,
        followingSessions: explore.followingSessions.concat(...sessions),
      }),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the paginate following sessions failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the paginate following sessions failure
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