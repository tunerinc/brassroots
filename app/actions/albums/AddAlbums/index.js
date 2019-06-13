'use strict';

/**
 * @module AddAlbums
 */

import * as types from '../types';

/**
 * Add albums retrieved from Ultrasound
 * 
 * @alias module:AddAlbums
 * @function addAlbums
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} albums The album objects retrieved from Ultrasound to add
 *
 * @returns {object}        Redux action with the type of ADD_ALBUMS and the retrieved albums
 */
export function addAlbums(albums) {
  return {
    type: types.ADD_ALBUMS,
    albums,
  };
}
