'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateFeedback
 */

import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/feedback';

/**
 * Updates any of the values in the feedback state
 * 
 * @function updateFeedback
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} updates Any updates to make to the feedback state
 * 
 * @returns {object}         Redux action with the type of UPDATE_FEEDBACK and the updates to make
 */
export function updateFeedback(
  updates: State,
): Action {
  return {
    type: types.UPDATE_FEEDBACK,
    updates,
  };
}