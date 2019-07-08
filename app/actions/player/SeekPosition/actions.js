'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SeekPosition
 */

import * as types from '../types';
import {type Action} from '../../../reducers/player';

/**
 * Notify the app of a seek position request
 *
 * @alias module:SeekPosition
 * @function seekPositionRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of SEEK_POSITION_REQUEST
 */
export function seekPositionRequest(): Action {
  return {
    type: types.SEEK_POSITION_REQUEST,
  };
}

/**
 * Notify the app of a seek position success
 * 
 * @alias module:SeekPosition
 * @function seekPositionSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return {object} Redux action with the type of SEEK_POSITION_SUCCESS
 */
export function seekPositionSuccess(): Action {
  return {
    type: types.SEEK_POSITION_SUCCESS,
  };
}

/**
 * Notify the app of a seek position failure
 * 
 * @alias module:SeekPosition
 * @function seekPositionFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param  {Error}  error     The error which caused the seek position failure
 * 
 * @return {object}           Redux action with the type of SEEK_POSITION_FAILURE and the error that caused the session to not seek to a new position
 */
export function seekPositionFailure(
  error: Error,
): Action {
  return {
    type: types.SEEK_POSITION_FAILURE,
    error,
  };
}