'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module StopSessionInfoListener
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Confirms the success of stopping the realtime listener for a session's info
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the infoUnsubscribe function reset
 */
export function success(
  state: State,
): State {
  return updateObject(state, {infoUnsubscribe: null, fetchingInfo: false, error: null});
}

/**
 * Adds the error which caused the stop session info listener failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the stop session info listener failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, fetchingInfo: false});
}