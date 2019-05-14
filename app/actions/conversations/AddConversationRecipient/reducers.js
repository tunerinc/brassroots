'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddConversationRecipientReducers
 */

import updateObject from '../../../utils/updateObject';
import type {Action, State} from '../../../reducers/conversations';

/**
 * Adds a recipient to the new conversation
 * 
 * @function addConversationRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state              The Redux state
 * @param   {object} action             The Redux action
 * @param   {string} action.type        The type of Redux action
 * @param   {string} action.recipientID The user id of the recipient to add
 * 
 * @returns {object}                    The state with the recipient added to the new conversation
 */
export function addConversationRecipient(
  state: State,
  action: Action,
): State {
  const {newConversation: {recipients, ...rest}} = state;
  const {recipientID} = action;
  const newConversation: {} = updateObject(rest, {recipients: recipients.concat(recipientID)});
  return updateObject(state, {newConversation});
}