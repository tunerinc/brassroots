'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddFavoriteTrack
 */

import * as types from '../types';
import {type Action} from '../../../reducers/users';

/**
 * Adds the Spotify id of the current user's favorite track to their user object
 * 
 * @alias module:AddFavoriteTrack
 * @function addFavoriteTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} favoriteTrackID The Spotify id of the current user's favorite track
 * 
 * @returns {object}                 Redux action with the type of ADD_FAVORITE_TRACK and the track's Spotify id
 */
export function addFavoriteTrack(
  favoriteTrackID: string,
): Action {
  return {
    type: types.ADD_FAVORITE_TRACK,
    favoriteTrackID,
  };
}