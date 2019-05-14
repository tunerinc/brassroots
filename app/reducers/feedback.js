'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../utils/updateObject';
import * as types from '../actions/feedback/types';

// Case Functions
import {addReportCategory} from '../actions/feedback/AddReportCategory/reducers';
import {removeReportCategory} from '../actions/feedback/RemoveReportCategory/reducers';
import {setReportMessage} from '../actions/feedback/SetReportMessage/reducers';

export type Action = {
  type?: string,
  error?: Error,
  category?: string,
  message?: string,
};

export type State = {
  types?: Array<string>,
  message?: string,
  userID?: ?string,
  reportedUser?: ?string,
  sending?: boolean,
  error?: ?Error,
};

/**
 * @constant
 * @alias feedbackState
 * @type {object}
 * 
 * @property {string[]} types         The types of feedback being reported
 * @property {string}   message       The message to send with the feedback
 * @property {string}   userID=null   The Brassroots id of the user being reported
 * @property {boolean}  sending=false Whether the feedback is sending
 * @property {Error}    error=null    The error related to feedback actions
 */
export const initialState = {
  types: [],
  message: '',
  userID: null,
  sending: false,
  error: null,
};

/**
 * Starts the request to send the report
 * 
 * @function reportRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the sending prop updated
 */
function reportRequest(
  state: State,
): State {
  return updateObject(state, {sending: true, error: null});
}

/**
 * Adds the error which caused the report failure
 * 
 * @function reportFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the report failure
 * 
 * @returns {object}              The state with the error prop updated
 */
function reportFailure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, sending: false});
}

export default function reducer(
  state: State = initialState,
  action: Action = {},
): State {
  if (typeof action.type === 'string') {
    switch (action.type) {
      case types.ADD_REPORT_CATEGORY:
        return addReportCategory(state, action);
      case types.REMOVE_REPORT_CATEGORY:
        return removeReportCategory(state, action);
      case types.REPORT_PROBLEM_REQUEST:
      case types.REPORT_USER_REQUEST:
        return reportRequest(state);
      case types.REPORT_PROBLEM_SUCCESS:
      case types.REPORT_USER_SUCCESS:
      case types.RESET_FEEDBACK:
        return initialState;
      case types.REPORT_PROBLEM_FAILURE:
      case types.REPORT_USER_FAILURE:
        return reportFailure(state, action);
      case types.SET_REPORT_MESSAGE:
        return setReportMessage(state, action);
      default:
        return state;
    }
  }

  return state;
}