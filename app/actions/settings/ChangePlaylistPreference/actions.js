'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistPreference
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change playlist preference request
 * 
 * @alias module:ChangePlaylistPreference
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_PLAYLIST_PREFERENCE_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_PLAYLIST_PREFERENCE_REQUEST};
}

/**
 * Notify the app of a change playlist preference success
 * 
 * @alias module:ChangePlaylistPreference
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} playlist The updated playlist preference status for the current user
 *
 * @returns {object}          Redux action with the type of CHANGE_PLAYLIST_PREFERENCE_SUCCESS and the updated preference status
 */
export function success(
  playlist: string,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_PREFERENCE_SUCCESS,
    updates: {preference: {playlist}},
  };
}

/**
 * Notify the app of a change playlist preference failure
 * 
 * @alias module:ChangePlaylistPreference
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change playlist preference failure
 *
 * @returns {object}       Redux action with the type of CHANGE_PLAYLIST_PREFERENCE_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_PREFERENCE_FAILURE,
    error,
  };
}