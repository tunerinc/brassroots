'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTermsReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/legal';

/**
 * Starts the request to get the terms of service from PS
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state             The Redux state
 * @param   {object}  action            The Redux action
 * @param   {string}  action.type       The type of Redux action
 * @param   {boolean} action.refreshing Whether the current user is refreshing the terms of service
 * 
 * @returns {object}                    The state with the fetchingTerms/refreshingTerms props updated
 */
export function request(
  state: State,
  action: Action,
): State {
  const {refreshing: refreshingTerms} = action;
  const updates: State = state.terms
    ? {
      terms: {
        ...state.terms,
        refreshingTerms,
        fetchingTerms: true,
        error: null,
      },
    }
    : state;

  return updateObject(state, updates);
}

/**
 * Confirms the success of getting the terms of service from PS
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {string} action.text  The terms of service text in HTML format
 * 
 * @returns {object}              The state with the terms of service added
 */
export function success(
  state: State,
  action: Action,
): State {
  const {text} = action;
  const updates: State = state.terms
    ? {
      terms: {
        text,
        lastUpdated,
        refreshingTerms: false,
        fetchingTerms: false,
        error: null,
      },
    }
    : state;

  return updateObject(state, updates);
}

/**
 * Adds the error which caused the get terms failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the get terms failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  const updates: State = state.terms
    ? {
      terms: {
        ...state.terms,
        error,
        refreshingTerms: false,
        fetchingTerms: false,
      },
    }
    : state;

  return updateObject(state, updates);
}