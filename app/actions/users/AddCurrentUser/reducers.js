'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentUserReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  singleUser,
  type Action,
  type State,
  type User,
} from '../../../reducers/users';

/**
 * Adds the current user
 * 
 * @function addSingleCurrentUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                            The Redux state
 * @param   {object} action                           The Redux action
 * @param   {string} action.type                      The type of Redux action
 * @param   {object} action.user                      The current user's profile information to add
 * @param   {string} action.user.id                   The Spotify id of the current user
 * @param   {string} action.user.displayName          The display name of the current user
 * @param   {string} action.user.spotifyAccountStatus The account status of the current user's Spotify
 * @param   {string} action.user.profileImage         The profile image of the current user
 * @param   {string} action.user.coverImage           The cover image of the current user
 * @param   {string} action.user.country              The country the current user is located in
 * @param   {string} action.user.bio                  The bio of the current user
 * @param   {string} action.user.birthdate            The month/day of the current user's birthdate
 * @param   {string} action.user.location             The location of the current user
 * @param   {string} action.user.website              The website of the current user
 * @param   {string} action.user.email                The email of the current user
 * @param   {string} action.user.favoriteTrackID      The Spotify id of the current user's favorite track
 * @param   {number} action.user.totalFollowers       The total amount of followers for the current user
 * @param   {number} action.user.totalFollowing       The total amount of following for the current user
 * 
 * @returns {object}                                  The state of the current user's profile information
 */
export function addSingleCurrentUser(
  state: User,
  action: Action,
): User {
  const {user} = action;
  const updates = typeof user === 'object'
    ? {...user}
    : {};

  return updateObject(state, updates);
}

/**
 * Adds the current user's profile information
 * 
 * @function addCurrentUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                            The Redux state
 * @param   {object} action                           The Redux action
 * @param   {string} action.type                      The type of Redux action
 * @param   {object} action.user                      The current user's profile information to add
 * @param   {string} action.user.id                   The Brassroots id of the current user
 * @param   {string} action.user.displayName          The display name of the current user
 * @param   {string} action.user.spotifyAccountStatus The account status of the current user's Spotify
 * @param   {string} action.user.profileImage         The profile image of the current user
 * @param   {string} action.user.coverImage           The cover image of the current user
 * @param   {string} action.user.country              The country the current user is located in
 * @param   {string} action.user.bio                  The bio of the current user
 * @param   {string} action.user.birthdate            The month/day of the current user's birthdate
 * @param   {string} action.user.location             The location of the current user
 * @param   {string} action.user.website              The website of the current user
 * @param   {string} action.user.email                The email of the current user
 * @param   {string} action.user.favoriteTrackID      The Spotify id of the current user's favorite track
 * @param   {number} action.user.totalFollowers       The total amount of followers for the current user
 * @param   {number} action.user.totalFollowing       The total amount of following for the current user
 * 
 * @returns {object}                                  The state with the current user's profile information added
 */
export function addCurrentUser(
  state: State,
  action: Action,
): State {
  const {usersByID} = state;
  const {user} = action;
  const updates = (
    typeof user === 'object'
    && typeof usersByID === 'object'
    && typeof user.id === 'string'
  )
    ? {
      lastUpdated,
      currentUserID: user.id,
      usersByID: updateObject(usersByID, {
        [user.id]: singleUser(usersByID[user.id], action),
      }),
    }
    : {};

  return updateObject(state, updates);
}