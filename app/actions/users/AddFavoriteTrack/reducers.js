'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddFavoriteTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  singleUser,
  type Action,
  type State,
} from '../../../reducers/users';

/**
 * Adds the Spotify id of the current user's favorite track
 * 
 * @function addFavoriteTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                  The Redux state
 * @param   {object} action                 The Redux action
 * @param   {string} action.type            The type of Redux action
 * @param   {string} action.favoriteTrackID The Spotify id of the current user's favorite track
 * 
 * @returns {object}                        The state with the Spotify id of the current user's favorite track added
 */
export function addFavoriteTrack(
  state: State,
  action: Action,
): State {
  const {currentUserID, usersByID} = state;
  const updates = typeof currentUserID === 'string' && typeof usersByID === 'object'
    ? {
      usersByID: updateObject(usersByID, {
        [currentUserID]: singleUser(usersByID[currentUserID], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}