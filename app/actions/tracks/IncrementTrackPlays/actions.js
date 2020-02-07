'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementTrackPlays
 */

import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

/**
 * Notify the app of a increment track plays request
 * 
 * @alias module:IncrementTrackPlays
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_TRACK_PLAYS_REQUEST
 */
export function request(): Action {
  return {type: types.INCREMENT_TRACK_PLAYS_REQUEST};
}

/**
 * 
 * Notify the app of a increment track plays success
 * 
 * @alias module:IncrementTrackPlays
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of INCREMENT_TRACK_PLAYS_SUCCESS
 */
export function success(): Action {
  return {type: types.INCREMENT_TRACK_PLAYS_SUCCESS};
}

/**
 * Notify the app of a increment track plays failure
 * 
 * @alias module:IncrementTrackPlays
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the increment track plays failure
 *
 * @returns {object}       Redux action with the type of INCREMENT_TRACK_PLAYS_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.INCREMENT_TRACK_PLAYS_FAILURE,
    error,
  };
}