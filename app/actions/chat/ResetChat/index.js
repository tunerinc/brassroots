'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ResetChat
 */

import * as types from '../types'
import {type Action} from '../../../reducers/chat';

/**
 * Resets the chat reducer
 * 
 * @alias module:ResetChat
 * @function resetChat
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_CHAT
 */
export function resetChat(): Action {
  return {
    type: types.RESET_CHAT,
  };
}