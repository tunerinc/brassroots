'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetPlaylistTopMembers
 */

import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

/**
 * Notify the app of a get playlist top members request
 * 
 * @alias module:GetPlaylistTopMembers
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_PLAYLIST_TOP_MEMBERS
 */
export function request(): Action {
  return {type: types.GET_PLAYLIST_TOP_MEMBERS_REQUEST};
}

/**
 * Notify the app of a get playlist top members success
 * 
 * @alias module:GetPlaylistTopMembers
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_PLAYLIST_TOP_MEMBERS
 */
export function success(): Action {
  return {type: types.GET_PLAYLIST_TOP_MEMBERS_SUCCESS};
}

/**
 * Notify the app of a get playlist top members failure
 * 
 * @alias module:GetPlaylistTopMembers
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get playlist top members failure
 *
 * @returns {object}       Redux action with the type of GET_PLAYLIST_TOP_MEMBERS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_PLAYLIST_TOP_MEMBERS_FAILURE,
    error,
  };
}