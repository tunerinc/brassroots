'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCoverImage
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Adds the cover image for the current user
 * 
 * @alias module:AddCoverImage
 * @function addCoverImage
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} photo The photo uri to save as the cover image
 *
 * @returns {object}       Redux action with the type of ADD_COVER_IMAGE and the cover photo uri
 */
export function addCoverImage(
  photo: string,
): Action {
  return {
    type: types.ADD_COVER_IMAGE,
    photo,
  };
}