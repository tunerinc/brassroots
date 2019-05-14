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

export type Action = {
  type?: string,
  error?: Error,
  category?: string,
};

export type State = {
  types?: Array<string>,
  message?: string,
  userID?: ?string,
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
      default:
        return state;
    }
  }

  return state;
}