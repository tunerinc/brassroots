'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentLocation
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Adds the location of the current user
 * 
 * @alias module:AddCurrentLocation
 * @function addCurrentLocation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} location The latitude and longitude of the current user
 *
 * @returns {object}          Redux action with the type of ADD_CURRENT_LOCATION and the current user's location
 */
export function addCurrentLocation(
  location: {
    latitude: number,
    longitude: number,
  },
) {
  return {
    type: types.ADD_CURRENT_LOCATION,
    location,
  };
}