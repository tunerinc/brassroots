'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateConversations
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/conversations';

/**
 * Updates any of the values in the conversations state
 * 
 * @function updateConversations
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the conversations state
 * 
 * @returns {object}         Redux action with the type of UPDATE_CONVERSATIONS and the updates to make
 */
export function updateConversations(
  updates: State,
): Action {
  return {
    type: types.UPDATE_CONVERSATIONS,
    updates,
  };
}