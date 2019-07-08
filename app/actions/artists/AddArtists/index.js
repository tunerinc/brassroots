'use strict';

/**
 * @module AddArtists
 */

import * as types from '../types';

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
export function addArtists(artists) {
  return {
    type: types.ADD_ARTISTS,
    artists,
  };
}
