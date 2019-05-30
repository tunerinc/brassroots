'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveSession
 */

import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

/**
 * Remove a session from Redux
 * 
 * @alias module:RemoveSession
 * @function removeSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} sessionID The Brassroots id of the session to remove
 * 
 * @returns {object}           Redux action with the type of REMOVE_SESSION and the session id to remove
 */
export function removeSession(
  sessionID: string,
): Action {
  return {
    type: types.REMOVE_SESSION,
    sessionID,
  };
}