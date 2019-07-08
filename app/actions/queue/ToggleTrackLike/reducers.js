'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ToggleTrackLikeReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Starts the request to toggle the like status for the current user on a queue track
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.queueID The Brassroots id of the queue track the current user is attempting to toggle like on
 * 
 * @returns {object}                The state with the single queue track concatenated onto the liking prop
 */
export function request(
  state: State,
  action: Action,
): State {
  const {liking, failed} = state;
  const {queueID} = action;
  const updates = Array.isArray(liking) && Array.isArray(failed) && typeof queueID === 'string'
    ? {
      liking: liking.concat(queueID),
      failed: failed.filter(id => id !== queueID),
      error: null,
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Confirms the success of the like status for the current user being toggled on a queue track
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.queueID The Brassroots id of the queue track in which the current user's like status was toggled
 * 
 * @returns {object}                The state with the single queue track removed from the liking prop
 */
export function success(
  state: State,
  action: Action,
): State {
  const {liking} = state;
  const {queueID} = action;
  const updates = Array.isArray(liking) && typeof queueID === 'string'
    ? {
      lastUpdated,
      error: null,
      liking: liking.filter(id => id !== queueID),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the toggle track like failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.queueID The Brassroots id of the queue track in which the like status toggle failed
 * @param   {Error}  action.error   The error which caused the toggle track like failure
 * 
 * @returns {object}                The state with the single queue track concatenated onto the failed prop
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {liking, failed} = state;
  const {queueID, error} = action;
  const updates = Array.isArray(liking) && Array.isArray(failed) && typeof queueID === 'string'
    ? {
      error,
      liking: liking.filter(id => id !== queueID),
      failed: failed.concat(queueID),
    }
    : {};

  return updateObject(state, updates);
}