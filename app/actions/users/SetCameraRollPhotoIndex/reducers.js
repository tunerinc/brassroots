'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetCameraRollPhotoIndexReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Sets the index of the selected photo in the current user's camera roll
 * 
 * @function setCameraRollPhotoIndex
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {number} action.index The index of the selected photo in the current user's camera roll
 * 
 * @returns {object}              The state with the selected camera roll photo's index set
 */
export function setCameraRollPhotoIndex(
  state: State,
  action: Action,
): State {
  const {index: selectedCameraRollPhotoIndex} = action;
  const updates = typeof selectedCameraRollPhotoIndex === 'number'
    ? {selectedCameraRollPhotoIndex}
    : {};

  return updateObject(state, updates);
}