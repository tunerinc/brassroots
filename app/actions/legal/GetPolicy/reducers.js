'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPolicyReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated} from '../../../reducers/legal';
import type {Action, State} from '../../../reducers/legal';

/**
 * Starts the request to get the privacy policy from PS
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state             The Redux state
 * @param   {object}  action            The Redux action
 * @param   {string}  action.type       The type of Redux action
 * @param   {boolean} action.refreshing Whether the current user is refreshing the privacy policy
 * 
 * @returns {object}                    The state with the fetchingPrivacy/refreshingPrivacy props updated
 */
export function request(
  state: State,
  action: Action,
): State {
  const {refreshing: refreshingPrivacy} = action;
  const updates: State = state.privacy
    ? {
      privacy: {
        ...state.privacy,
        refreshingPrivacy,
        fetchingPrivacy: true,
        error: null,
      },
    }
    : state;

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the privacy policy from PS
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state       The Redux state
 * @param   {object} action      The Redux action
 * @param   {string} action.type The type of Redux action
 * @param   {string} action.text The privacy policy's text in HTML format
 * 
 * @returns {object}             The state with the privacy policy added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {text} = action;
  const updates: State = state.privacy
    ? {
      privacy: {
        text,
        lastUpdated,
        refreshingPrivacy: false,
        fetchingPrivacy: false,
        error: null,
      },
    }
    : state;

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get policy failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get policy failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  const updates: State = state.privacy
    ? {
      privacy: {
        ...state.privacy,
        error,
        refreshingPrivacy: false,
        fetchingPrivacy: false,
      },
    }
    : state;

  return updateObject(state, updates);
}