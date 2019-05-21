'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupPermissions
 */

import * as types from '../types';
import {type Action} from '../../../reducers/groups';

/**
 * Sets the permissions for the new group being created by the current user
 * 
 * @alias module:SetNewGroupPermissions
 * @function setNewGroupPermissions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} permission The permission to set for the new group
 * 
 * @returns {object}            Redux action with the type of SET_NEW_GROUP_PERMISSIONS and the new group's permission
 */
export function setNewGroupPermissions(
  permission: string,
): Action {
  return {
    type: types.SET_NEW_GROUP_PERMISSIONS,
    permission,
  };
}