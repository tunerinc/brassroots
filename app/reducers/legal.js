'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import * as types from '../actions/legal/types';

export const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type Action = {
  +type?: string,
  +error?: Error,
  +refreshing?: boolean,
  +text?: string,
};

type LegalEntity = {
  +lastUpdated?: string,
  +text?: string,
  +fetching?: boolean,
  +refreshing?: boolean,
  +error?: ?Error,
};

type State = {
  +privacy?: LegalEntity,
  +terms?: LegalEntity,
};

export type {
  GetState,
  PromiseAction,
  ThunkAction,
  Dispatch,
  Action,
  State,
};

/**
 * @constant
 * @alias legalState
 * @type {object}
 * 
 * @property {object}  privacy                  The privacy policy object
 * @property {string}  privacy.lastUpdated      The date/time the privacy policy object was last updated
 * @property {string}  privacy.text             The text of the privacy policy
 * @property {boolean} privacy.fetching=false   Whether the current user is fetching the privacy policy
 * @property {boolean} privacy.refreshing=false Whether the current user is refreshing the privacy policy
 * @property {Error}   privacy.error=null       The error related to the privacy policy actions
 * @property {object}  terms                    The terms of service object
 * @property {string}  terms.lastUpdated        The date/time the terms of service object was last updated
 * @property {string}  terms.text               The text of the terms of service
 * @property {boolean} terms.fetching=false     Whether the current user is fetching the terms of service
 * @property {boolean} terms.refreshing=false   Whether the current user is refreshing the terms of service
 * @property {Error}   terms.error=null         The error related to the terms of service actions
 */
export const initialState: State = {
  privacy: {
    lastUpdated,
    text: '',
    fetching: false,
    refreshing: false,
    error: null,
  },
  terms: {
    lastUpdated,
    text: '',
    fetching: false,
    refreshing: false,
    error: null,
  },
};

/**
 * Updates any of the values in the state
 * 
 * @function update
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state               The Redux state
 * @param   {object}  action              The Redux action
 * @param   {string}  action.type         The type of Redux action
 * @param   {string}  [action.text]       The text of the retrieved legal document
 * @param   {boolean} [action.refreshing] Whether the current user is refreshing
 * @param   {Error}   [action.error]      The error which caused the failure
 * @param   {string}  type                The type of legal entity to update
 * 
 * @returns {object}                      The state with the updated values
 */
function update(
  state: State,
  action: Action,
  type: string,
): State {
  const {privacy, terms} = state;
  const fetching: boolean = typeof action.type === 'string' && action.type.includes('REQUEST');
  const updates: State = privacy && terms && state[type]
    ? {
      [type]: {
        lastUpdated,
        fetching,
        text: typeof action.text === 'string' ? action.text : state[type].text,
        refreshing: action.refreshing ? action.refreshing : !fetching ? false : state[type].refreshing,
        error: action.error && !fetching ? action.error : null,
      },
    }
    : {};

  return updateObject(state, updates);
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.GET_POLICY_REQUEST:
      case types.GET_POLICY_SUCCESS:
      case types.GET_POLICY_FAILURE:
        return update(state, action, 'privacy');
      case types.GET_TERMS_REQUEST:
      case types.GET_TERMS_SUCCESS:
      case types.GET_TERMS_FAILURE:
        return update(state, action, 'terms');
      default:
        return state;
    }
  }

  return state;
}