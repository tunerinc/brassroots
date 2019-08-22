'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementArtistPlays
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
  * Notify the app of a increment artist plays request
  * 
  * @alias module:IncrementArtistPlays
  * @function request
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @returns {object} Redux action with the type of INCREMENT_ARTIST_PLAYS_REQUEST
  */
export function request(): Action {
  return {type: types.INCREMENT_ARTIST_PLAYS_REQUEST};
}

/**
  * Notify the app of a increment artist plays success
  * 
  * @alias module:IncrementArtistPlays
  * @function success
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @returns {object} Redux action with the type of INCREMENT_ARTIST_PLAYS_SUCCESS
  */
export function success(): Action {
  return {type: types.INCREMENT_ARTIST_PLAYS_SUCCESS};
}

/**
  * Notify the app of a increment artist plays failure
  * 
  * @alias module:IncrementArtistPlays
  * @function failure
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @param   {Error}  error The error which caused the increment artist plays failure
  *
  * @returns {object}       Redux action with the type of INCREMENT_ARTIST_PLAYS_FAILURE and the error which caused the failure
  */
export function failure(
  error: Error,
): Action {
  return {
    type: types.INCREMENT_ARTIST_PLAYS_FAILURE,
    error,
  };
}