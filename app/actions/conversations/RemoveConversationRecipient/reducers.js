'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveConversationRecipientReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/conversations';

/**
 * Removes a recipient from the new conversation
 * 
 * @function removeConversationRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state              The Redux state
 * @param   {object} action             The Redux action
 * @param   {string} action.type        The type of Redux action
 * @param   {string} action.recipientID The user id of the recipient to remove
 * 
 * @returns {object}                    The state with the recipient removed from the new conversation
 */
export function removeConversationRecipient(
  state: State,
  action: Action,
): State {
  const {recipientID} = action;
  const updates: State = state.newConversation
    ? {
      newConversation: {
        ...state.newConversation,
        recipients: state.newConversation.recipients.filter(id => id !== recipientID),
      },
    }
    : state;

  return updateObject(state, updates);
}