'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateProfileReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/onboarding';

/**
 * Starts the request to create a profile on Brassroots for the current user
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the creatingUser prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {creatingUser: true, error: null});
}

/**
 * Confirms the success of a profile being created on Brassroots for the current user
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the creatingUser/profileCreated props updated
 */
export function success(
  state: State,
): State {
  return updateObject(state, {creatingUser: false, profileCreated: true, error: null});
}

/**
 * Adds the error which caused the create profile failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the create profile failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, creatingUser: false});
}