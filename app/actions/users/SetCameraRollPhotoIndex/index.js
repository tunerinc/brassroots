'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetCameraRollPhotoIndex
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Sets the index for the selected camera roll photo
 * 
 * @alias module:SetCameraRollPhotoIndex
 * @function setCameraRollPhotoIndex
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {number} index The index of the selected camera roll photo
 * 
 * @returns {object}       Redux action with the type of SET_CAMERA_ROLL_PHOTO_INDEX and the selexted photo's index
 */
export function setCameraRollPhotoIndex(
  index: number,
): Action {
  return {
    type: types.SET_CAMERA_ROLL_PHOTO_INDEX,
    index,
  };
}