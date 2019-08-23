'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../utils/updateObject';
import {type Firebase} from '../utils/firebaseTypes';
import * as types from '../actions/feedback/types';

// Case Functions

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

type Action = {
  +type?: string,
  +error?: Error,
  +category?: string,
  +message?: string,
  +updates?: State,
};

type State = {
  +types?: Array<string>,
  +text?: ?string,
  +userID?: ?string,
  +reportedUser?: ?string,
  +sending?: boolean,
  +error?: ?Error,
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
 * @alias feedbackState
 * @type {object}
 * 
 * @property {string[]} types         The types of feedback being reported
 * @property {string}   text=null     The message to send with the feedback
 * @property {string}   userID=null   The Brassroots id of the user being reported
 * @property {boolean}  sending=false Whether the feedback is sending
 * @property {Error}    error=null    The error related to feedback actions
 */
export const initialState = {
  types: [],
  text: null,
  userID: null,
  sending: false,
  error: null,
};

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.REPORT_PROBLEM_REQUEST:
      case types.REPORT_USER_REQUEST:
        return updateObject(state, {sending: true, error: null});
      case types.REPORT_PROBLEM_SUCCESS:
      case types.REPORT_USER_SUCCESS:
      case types.RESET_FEEDBACK:
        return initialState;
      case types.REPORT_PROBLEM_FAILURE:
      case types.REPORT_USER_FAILURE:
        return updateObject(state, {error: action.error, sending: false});
      case types.UPDATE_FEEDBACK:
        return updateObject(state, action.updates);
      default:
        return state;
    }
  }

  return state;
}