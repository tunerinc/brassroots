'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistImages
 */

import * as types from '../types';
import {
  type Action,
  type Artist,
} from '../../../reducers/artists';

/**
 * Notify the app of a get artist images request
 * 
 * @alias GetArtistImages
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns {object} Redux action with the type of GET_ARTIST_IMAGES_REQUEST
 */
export function request() {
  return {type: types.GET_ARTIST_IMAGES_REQUEST};
}

/**
 * Notify the app of a get artist images success
 * 
 * @alias GetArtistImages
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} artists          The artists with the image urls to add for them
 * @param   {string} artists[].small  120x120 size of the artist's image, if available
 * @param   {string} artists[].medium 320x320 size of the artist's image, if available
 * @param   {string} artists[].large  640x640 size of the artist's image, if available
 * 
 * @returns {object}                  Redux action with the type of GET_ARTIST_IMAGES_SUCCESS and artist images to add
 */
export function success(): Action {
  return {type: types.GET_ARTIST_IMAGES_SUCCESS};
}

/**
 * Notify the app of a get artist images failure
 * 
 * @alias GetArtistImages
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {Error}  error The error which caused the get artist images failure
 * 
 * @returns {object}       Redux action with the type of GET_ARTIST_IMAGES_FAILURE and the error which caused the failure
 */
export function failure(
  error: Error,
): Action {
  return {
    type: types.GET_ARTIST_IMAGES_FAILURE,
    error,
  };
}