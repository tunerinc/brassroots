'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopListeners
 */

import * as types from '../types';
import {type Action} from '../../../reducers/artists';

/**
 * Notify the app of a get artist top listeners request
 * 
 * @alias module:GetArtistTopListeners
 * @function getArtistTopListenersRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of GET_ARTIST_TOP_LISTENERS_REQUEST
 */
export function getArtistTopListenersRequest(): Action {
  return {
    type: types.GET_ARTIST_TOP_LISTENERS_REQUEST,
  };
}

/**
 * Notify the app of a get artist top listeners success
 * 
 * @alias module:GetArtistTopListeners
 * @function getArtistTopListenersSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {string}   artistID  The artist id to get top listeners of
 * @param   {string[]} listeners The artist's top 3 listeners' user ids
 *
 * @returns {object}             Redux action with the type of GET_ARTIST_TOP_LISTENERS_SUCCESS and the top artist listeners
 */
export function getArtistTopListenersSuccess(
  artistID: string,
  listeners: Array<string>,
): Action {
  return {
    type: types.GET_ARTIST_TOP_LISTENERS_SUCCESS,
    artistID,
    listeners,
  };
}

/**
 * Notify the app of a get artist top listeners failure
 * 
 * @alias module:GetArtistTopListeners
 * @function getArtistTopListenersFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the get artist top listeners failure
 *
 * @returns {object}       Redux action with the type of GET_ARTIST_TOP_LISTENERS_FAILURE and the error which caused the failure
 */
export function getArtistTopListenersFailure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_TOP_LISTENERS_FAILURE,
    error,
  };
}