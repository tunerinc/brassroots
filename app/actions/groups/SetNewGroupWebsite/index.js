'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SetNewGroupWebsite
 */

import isURL from '../../../utils/isURL';
import * as types from '../types';
import type {Action} from '../../../reducers/groups';

/**
 * Sets the website for the new group being created by the current user
 * 
 * @alias module:SetNewGroupWebsite
 * @function setNewGroupWebsite
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} website The website to set for the new group
 * 
 * @returns {object}         Redux action with the type of SET_NEW_GROUP_WEBSITE, the new website, and its validity
 */
export function setNewGroupWebsite(
  website: string,
): Action {
  return {
    type: types.SET_NEW_GROUP_WEBSITE,
    websiteValid: isURL(website),
    website,
  };
}