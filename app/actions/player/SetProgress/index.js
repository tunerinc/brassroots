'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetProgress
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Sets the progress for a session
 * 
 * @function setProgress
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {number} progress The new progress to set in milliseconds
 * 
 * @returns {object}          Redux action with the type of SET_PROGRESS and the new progress for the session
 */
export function setProgress(
  progress: number,
): Action {
  return {
    type: types.SET_PROGRESS,
    progress,
  };
}