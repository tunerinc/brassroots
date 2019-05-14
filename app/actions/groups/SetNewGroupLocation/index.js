'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupLocation
 */

import * as types from '../types';
import type {Action} from '../../../reducers/groups';

/**
 * Sets the location for a new group being created by the current user
 * 
 * @alias module:SetNewGroupLocation
 * @function setNewGroupLocation
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} location The location to set for the new group
 * 
 * @returns {object}          Redux action with the type of SET_NEW_GROUP_LOCATION and the new group's location
 */
export function setNewGroupLocation(
  location: string,
): Action {
  return {
    type: types.SET_NEW_GROUP_LOCATION,
    location,
  };
}