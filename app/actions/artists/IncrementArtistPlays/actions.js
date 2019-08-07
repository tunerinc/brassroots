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
  * @function incrementArtistPlaysRequest
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @returns {object} Redux action with the type of INCREMENT_ARTIST_PLAYS_REQUEST
  */
export function incrementArtistPlaysRequest(): Action {
  return {type: types.INCREMENT_ARTIST_PLAYS_REQUEST};
}

/**
  * Notify the app of a increment artist plays success
  * 
  * @alias module:IncrementArtistPlays
  * @function incrementArtistPlaysSuccess
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @returns {object} Redux action with the type of INCREMENT_ARTIST_PLAYS_SUCCESS
  */
export function incrementArtistPlaysSuccess(): Action {
  return {type: types.INCREMENT_ARTIST_PLAYS_SUCCESS};
}

/**
  * Notify the app of a increment artist plays failure
  * 
  * @alias module:IncrementArtistPlays
  * @function incrementArtistPlaysFailure
  * 
  * @author Aldo Gonzalez <aldo@tunerinc.com>
  *
  * @param   {Error}  error The error which caused the increment artist plays failure
  *
  * @returns {object}       Redux action with the type of INCREMENT_ARTIST_PLAYS_FAILURE and the error which caused the failure
  */
export function incrementArtistPlaysFailure(
  error: Error,
): Action {
  return {
    type: types.INCREMENT_ARTIST_PLAYS_FAILURE,
    error,
  };
}