'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateSessions
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/sessions';

/**
 * Updates any of the values in the sessions state
 * 
 * @function updateSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the sessions state
 * 
 * @returns {object}         Redux action with the type of UPDATE_SESSIONS and the updates to make
 */
export function updateSessions(
  updates: State,
): Action {
  return {
    type: types.UPDATE_SESSIONS,
    updates,
  };
}