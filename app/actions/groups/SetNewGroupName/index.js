'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupName
 */

import * as types from '../types';
import {type Action} from '../../../reducers/groups';

/**
 * Sets the name for the new group being created by the current user
 * 
 * @alias module:SetNewGroupName
 * @function setNewGroupName
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} name The name to set for the new group
 * 
 * @returns {object}      Redux action with the type of SET_NEW_GROUP_NAME and the new group's name
 */
export function setNewGroupName(
  name: string,
): Action {
  return {
    type: types.SET_NEW_GROUP_NAME,
    name,
  };
}