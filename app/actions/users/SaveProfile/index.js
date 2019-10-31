'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module SaveProfile
 */

import {Actions, ActionConst} from 'react-native-router-flux';
import {updateOnboarding} from '../../onboarding/UpdateOnboarding';
import {addEntities} from '../../entities/AddEntities';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/users';
import {
  type FirestoreInstance,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

type User = {
  +id: string,
  +bio?: string,
  +location?: string,
  +website?: string,
  +onboarding: boolean,
};

/**
 * Async function that saves the profile for the current user
 * 
 * @async
 * @function saveProfile
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {object}  user               The profile object to save for the current user
 * @param    {string}  user.id            The user id to save the profile for
 * @param    {string}  [user.bio]         The new bio to set for the current user
 * @param    {string}  [user.location]    The new location to set for the current user
 * @param    {string}  [user.website]     The new website to set for the current user
 *
 * @returns  {Promise}
 * @resolves {object}                     The profile object that was saved for the current user
 * @rejects  {Error}                      The error which caused the save profile failure
 */
export function saveProfile(
  user: User,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const usersRef: FirestoreRef = firestore.collection('users');
    const {onboarding, ...restOfUser} = user;

    try {
      await usersRef.doc(restOfUser.id).update({...restOfUser});
      dispatch(updateOnboarding({onboarding: false}));
      dispatch(addEntities({users: {[user.id]: user}}));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
