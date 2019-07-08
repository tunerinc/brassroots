'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetReportMessageReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/feedback';

/**
 * Sets the message for the report
 * 
 * @function setReportMessage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state          The Redux state
 * @param   {object} action         The Redux action
 * @param   {string} action.type    The type of Redux action
 * @param   {string} action.message The message to set for the report
 * 
 * @returns {object}                The state with the message set for the report
 */
export function setReportMessage(
  state: State,
  action: Action,
): State {
  const {message} = action;
  const updates = typeof message === 'string'
    ? {message}
    : {};

  return updateObject(state, updates);
}