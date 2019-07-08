'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveShareRecipient
 */

import * as types from '../types';
import {type Action} from '../../../reducers/share';

/**
 * Removes a recipient from the current user's shared item
 * 
 * @alias module:RemoveShareRecipient
 * @function removeShareRecipient
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} recipientID The user id of the recipient that is being removed
 *
 * @returns {object}             Redux action with the type of REMOVE_SHARE_RECIPIENT and the user id of the recipient
 */
export function removeShareRecipient(
  recipientID: string,
): Action {
  return {
    type: types.REMOVE_SHARE_RECIPIENT,
    recipientID,
  };
}
