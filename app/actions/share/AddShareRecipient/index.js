'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddShareRecipient
 */

import * as types from '../types';
import type {Action} from '../../../reducers/share';

/**
 * Adds a recipient to the current user's shared item
 * 
 * @alias module:AddShareRecipient
 * @function addShareRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} recipientID The user id of the recipient that is being added
 *
 * @returns {object}             Redux action with the type of ADD_SHARE_RECIPIENT and the user id of the recipient
 */
export function addShareRecipient(
  recipientID: string,
): Action {
  return {
    type: types.ADD_SHARE_RECIPIENT,
    recipientID,
  };
}
