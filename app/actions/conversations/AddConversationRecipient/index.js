'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddConversationRecipient
 */

import * as types from '../types';
import type {Action} from '../../../reducers/conversations';

/**
 * Adds a recipient to the new conversation
 *
 * @alias module:AddConversationRecipient
 * @function addConversationRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} recipientID The user id of the person being added as a conversation recipient
 *
 * @returns {object}             Redux action with the type of ADD_CONVERSATION_RECIPIENT and the user id being added
 */
export function addConversationRecipient(
  recipientID: string,
): Action {
  return {
    type: types.ADD_CONVERSATION_RECIPIENT,
    recipientID,
  };
}
