'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddShareRecipientReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/share';

/**
 * Adds a recipient for the current user to share with
 * 
 * @function addShareRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state              The Redux state
 * @param   {object} action             The Redux action
 * @param   {string} action.type        The type of Redux action
 * @param   {string} action.recipientID The user id of the recipient to add
 * 
 * @returns {object}                    The state with the recipient added
 */
export function addShareRecipient(
  state: State,
  action: Action,
): State {
  const {recipientID} = action;
  const updates = Array.isArray(state.recipients)
    ? {
      recipients: state.recipients.concat(recipientID),
    }
    : {};

  return updateObject(state, updates);
}