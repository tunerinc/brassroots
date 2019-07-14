'use strict';

/**
 * @module AddPeopleReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleUser, lastUpdated} from '../../../reducers/users';

/**
 * Adds a single user
 * 
 * @function addSinglePeople
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                      The Redux state
 * @param   {object} action                     The Redux action
 * @param   {string} action.type                The type of Redux action
 * @param   {object} action.people              The people that are being added in total
 * @param   {object} action.user                The user object to add
 * @param   {string} action.user.id             The Brassroots id of the single user
 * @param   {string} [action.user.displayName]  The display name of the single user
 * @param   {string} [action.user.profileImage] The profile image of the single user
 * @param   {string} [action.user.coverImage]   The cover image of the single user
 * @param   {string} [action.user.bio]          The bio of the single user
 * @param   {string} [action.user.location]     The location of the single user
 * @param   {string} [action.user.website]      The website of the single user
 * 
 * @returns {object}                            The state of the newly added single user
 */
export function addSinglePeople(state, action) {
  const {user} = action;
  return updateObject(state, {...user});
}

/**
 * Adds people and their profile information to Redux
 * 
 * @function addPeople
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {object} action.people The people to add to Redux
 * 
 * @returns {object}               The state with the people and their profile information added
 */
export function addPeople(state, action) {
  const {people} = action;
      
  let {usersByID} = state;

  Object.values(people).forEach(user => {
    const addedUser = singleUser(usersByID[user.id], {...action, user});
    usersByID = updateObject(usersByID, {[user.id]: addedUser});
  });

  return updateObject(state, {usersByID, lastUpdated, fetchingUsers: false, error: null});
}