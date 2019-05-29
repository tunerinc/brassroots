'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddSessions
 */

import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

/**
 * Adds sessions to Redux
 * 
 * @alias module:AddSessions
 * @function addSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} sessions The session objects to add to Redux
 * 
 * @returns {object}          Redux action with the type of ADD_SESSIONS and the sessions to add
 */
export function addSessions(
  sessions: {+[id: string]: Session},
): Action {
  return {
    type: types.ADD_SESSIONS,
    sessions,
  };
}