'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistJoinNotification
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change playlist join notification request
 * 
 * @alias module:ChangePlaylistJoinNotification
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST};
}

/**
 * Notify the app of a change playlist join notification success
 * 
 * @alias module:ChangePlaylistJoinNotification
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} playlistJoin The updated playlist join notification status for the current user
 *
 * @returns {object}               Redux action with the type of CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS and the updated notification status
 */
export function success(
  playlistJoin: boolean,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS,
    updates: {notify: {playlistJoin}},
  };
}

/**
 * Notify the app of a change playlist join notification failure
 * 
 * @alias module:ChangePlaylistJoinNotification
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change playlist join notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE,
    error,
  };
}