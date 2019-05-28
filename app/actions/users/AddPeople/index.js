'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddPeople
 */

import * as types from '../types';
import {
  type User,
  type Action,
} from '../../../reducers/users';

/**
 * Adds users retrieved from Ultrasound
 * 
 * @alias module:AddPeople
 * @function addPeople
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} people The people to add to the current user's session
 *
 * @returns {object}        Redux action with the type of ADD_PEOPLE and the people to add to the app
 */
export function addPeople(
  people: {+[id: string]: User},
): Action {
  return {
    type: types.ADD_PEOPLE,
    people,
  };
}
