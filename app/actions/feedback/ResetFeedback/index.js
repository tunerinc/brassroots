'use strict';

/**
 * @format
 * @flow
 */

import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

/**
 * @module ResetFeedback
 */

/**
 * Resets the Redux feedback state object
 * 
 * @alias module:ResetFeedback
 * @function resetFeedback
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of RESET_FEEDBACK
 */
export function resetFeedback(): Action {
  return {
    type: types.RESET_FEEDBACK,
  };
}