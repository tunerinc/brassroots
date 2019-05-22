'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddArtists
 */

import * as types from '../types';
import {
  type Artist,
  type Action,
} from '../../../reducers/artists';

/**
  * Add artists retrieved from Ultrasound
  * 
  * @alias module:AddArtists
  * @function addArtists
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @param   {object} artists The artist objects to add from Ultrasound
  *
  * @returns {object}         Redux action with the type of ADD_ARTISTS and the retrieved artists
  */
export function addArtists(
  artists: {+[id: string]: Artist},
): Action {
  return {
    type: types.ADD_ARTISTS,
    artists,
  };
}
