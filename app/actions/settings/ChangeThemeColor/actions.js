'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module ChangeThemeColor
 */

import * as types from '../types';
import {type Action} from '../../../reducers/settings';

/**
 * Notify the app of a change theme color request
 * 
 * @alias module:ChangeThemeColor
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CHANGE_THEME_COLOR_REQUEST
 */
export function request(): Action {
  return {type: types.CHANGE_THEME_COLOR_REQUEST};
}

/**
 * Notify the app of a change theme color success
 * 
 * @alias module:ChangeThemeColor
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string} theme The color theme the current user has selected to change the app to
 *
 * @returns {object}       Redux action with the type of CHANGE_THEME_COLOR_SUCCESS and the new theme color
 */
export function success(
  theme: string,
): Action {
  return {
    type: types.CHANGE_THEME_COLOR_SUCCESS,
    updates: {theme},
  };
}

/**
 * Notify the app of a change theme color failure
 * 
 * @alias module:ChangeThemeColor
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the change theme color failure
 *
 * @returns {object}       Redux action with the type of CHANGE_THEME_COLOR_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.CHANGE_THEME_COLOR_FAILURE,
    error,
  };
}