'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ClearNewConversation
 */

import * as types from '../types';
import {type Action} from '../../../reducers/conversations';

/**
 * Clears the new conversation if not sent
 * 
 * @alias module:ClearNewConversation
 * @function clearNewConversation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CLEAR_NEW_CONVERSATION
 */
export function clearNewConversation(): Action {
  return {
    type: types.CLEAR_NEW_CONVERSATION,
  };
}
