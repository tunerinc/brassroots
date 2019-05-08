'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistPreference
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a change playlist preference request
 * 
 * @alias module:ChangePlaylistPreference
 * @function changePlaylistPreferenceRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_PLAYLIST_PREFERENCE_REQUEST
 */
export function changePlaylistPreferenceRequest(): Action {
  return {
    type: types.CHANGE_PLAYLIST_PREFERENCE_REQUEST,
  };
}

/**
 * Notify the app of a change playlist preference success
 * 
 * @alias module:ChangePlaylistPreference
 * @function changePlaylistPreferenceSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} status The updated playlist preference status for the current user
 *
 * @returns {object}        Redux action with the type of CHANGE_PLAYLIST_PREFERENCE_SUCCESS and the updated preference status
 */
export function changePlaylistPreferenceSuccess(
  status: string,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_PREFERENCE_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change playlist preference failure
 * 
 * @alias module:ChangePlaylistPreference
 * @function changePlaylistPreferenceFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change playlist preference failure
 *
 * @returns {object}       Redux action with the type of CHANGE_PLAYLIST_PREFERENCE_FAILURE and the error which caused the failure
 */
export function changePlaylistPreferenceFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_PREFERENCE_FAILURE,
    error,
  };
}