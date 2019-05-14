'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupBio
 */

import * as types from '../types';
import type {Action} from '../../../reducers/groups';

/**
 * Sets the bio for a new group being created by the current user
 * 
 * @alias module:SetNewGroupBio
 * @function setNewGroupBio
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} bio The bio to set for the new group
 * 
 * @returns {object}     Redux action with the type of SET_NEW_GROUP_BIO and the bio for the new group
 */
export function setNewGroupBio(
  bio: string,
): Action {
  return {
    type: types.SET_NEW_GROUP_BIO,
    bio,
  };
}