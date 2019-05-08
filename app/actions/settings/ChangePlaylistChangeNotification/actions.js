'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangePlaylistChangeNotification
 */

import * as types from '../types';
import type {Action} from '../../../reducers/settings';

/**
 * Notify the app of a change playlist change notification request
 * 
 * @alias module:ChangePlaylistChangeNotification
 * @function changePlaylistChangeNotificationRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST
 */
export function changePlaylistChangeNotificationRequest(): Action {
  return {
    type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST,
  };
}

/**
 * Notify the app of a change playlist change notification success
 * 
 * @alias module:ChangePlaylistChangeNotification
 * @function changePlaylistChangeNotificationSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {boolean} status The updated playlist change notification status for the current user
 *
 * @returns {object}         Redux action with the type of CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS and the updated notification status
 */
export function changePlaylistChangeNotificationSuccess(
  status: boolean,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS,
    status,
  };
}

/**
 * Notify the app of a change playlist change notification failure
 * 
 * @alias module:ChangePlaylistChangeNotification
 * @function changePlaylistChangeNotificationFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change playlist change notification failure
 *
 * @returns {object}       Redux action with the type of CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE and the error which caused the failure
 */
export function changePlaylistChangeNotificationFailure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE,
    error,
  };
}