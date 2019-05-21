'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveShareRecipient
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/share';

/**
 * Removes a recipient for the current user to share with
 * 
 * @function removeShareRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state              The Redux state
 * @param   {object} action             The Redux action
 * @param   {string} action.type        The type of Redux action
 * @param   {string} action.recipientID The user id of the recipient to remove
 * 
 * @returns {object}                    The state with the recipient removed
 */
export function removeShareRecipient(
  state: State,
  action: Action,
): State {
  const {recipientID} = action;
  const updates = Array.isArray(state.recipients)
    ? {
      recipients: state.recipients.filter(e => e !== recipientID),
    }
    : {};

  return updateObject(state, updates);
}