'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveProfile
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

type User = {
  +id: string,
  +bio?: string,
  +location?: string,
  +website?: string,
};

/**
 * Notify the app of a save profile request
 * 
 * @alias module:SaveProfile
 * @function saveProfileRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of SAVE_PROFILE_REQUEST
 */
export function saveProfileRequest(): Action {
  return {
    type: types.SAVE_PROFILE_REQUEST,
  };
}

/**
 * Notify the app of a save profile success
 * 
 * @alias module:SaveProfile
 * @function saveProfileSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object} user               The profile object to save for the current user
 * @param   {string} user.id            The Brassroots id of the current user
 * @param   {string} [user.bio]         The bio of the current user
 * @param   {string} [user.location]    The location of the current user
 * @param   {string} [user.website]     The website of the current user
 *
 * @returns {object}                    Redux action with the type of SAVE_PROFILE_SUCCESS and the profile object to save
 */
export function saveProfileSuccess(
  user: User,
): Action {
  return {
    type: types.SAVE_PROFILE_SUCCESS,
    user,
  };
}

/**
 * Notify the app of a save profile failure
 * 
 * @alias module:SaveProfile
 * @function saveProfileFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the save profile failure
 *
 * @returns {object}       Redux action with the type of SAVE_PROFILE_FAILURE and the error which caused the failure
 */
export function saveProfileFailure(
  error: Error,
): Action {
  return {
    type: types.SAVE_PROFILE_FAILURE,
    error,
  };
}