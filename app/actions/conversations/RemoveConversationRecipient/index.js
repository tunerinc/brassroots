'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveConversationRecipient
 */

import * as types from '../types';
import {type Action} from '../../../reducers/conversations';

/**
 * Removes a recipient from the new conversation
 * 
 * @alias module:RemoveConversationRecipient
 * @function removeConversationRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} recipientID    The user id of the person being added as a conversation recipient
 *
 * @returns {object}                Redux action with the type of REMOVE_CONVERSATION_RECIPIENT and the user id being removed from the conversation
 */
export function removeConversationRecipient(
  recipientID: string,
): Action {
  return {
    type: types.REMOVE_CONVERSATION_RECIPIENT,
    recipientID,
  };
}
