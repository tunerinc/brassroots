'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetProgressReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Sets the progress of the currently playing track
 * 
 * @function setProgress
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state           The Redux state
 * @param   {object} action          The Redux action
 * @param   {string} action.type     The type of Redux action
 * @param   {number} action.progress The progress to set for the player
 * 
 * @returns {object}                 The state with the new progress set
 */
export function setProgress(
  state: State,
  action: Action,
): State {
  const {progress} = action;
  return updateObject(state, {progress});
}