'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateChat
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/chat';

/**
 * Updates any of the values in the chat state
 * 
 * @function updateChat
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the chat state
 * 
 * @returns {object}         Redux action with the type of UPDATE_CHAT and the updates to make
 */
export function updateChat(
  updates: State,
): Action {
  return {
    type: types.UPDATE_CHAT,
    updates,
  };
}