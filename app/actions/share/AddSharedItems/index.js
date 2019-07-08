'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddSharedItems
 */

import * as types from '../types';
import {
  type Action,
  type SharedItems,
} from '../../../reducers/share';

/**
 * Adds shared music items for the current user to share
 * 
 * @alias module:AddSharedItems
 * @function addSharedItems
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} items         The music items that are going to be shared from the current user
 * @param   {string} items[].id    The id of the item that is being shared
 * @param   {string} items[].type  The type of music that is being shared from the current user
 *
 * @returns {object}               Redux action with the type of ADD_SHARED_ITEMS and the music items to add
 */
export function addSharedItems(
  items: SharedItems,
): Action {
  return {
    type: types.ADD_SHARED_ITEMS,
    items,
  };
}
