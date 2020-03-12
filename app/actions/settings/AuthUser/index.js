'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AuthorizeUser
 */

import Spotify from 'rn-spotify-sdk';
import {Actions, ActionConst} from 'react-native-router-flux';
import {addEntities} from '../../entities/AddEntities';
import {updateOnboarding} from '../../onboarding/UpdateOnboarding';
import {updateUsers} from '../../users/UpdateUsers';
import {getUserSettings} from '../GetUserSettings';
import {createProfile} from '../../onboarding/CreateProfile';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/settings';
import {type PrivateUser} from '../../../utils/spotifyAPI/types';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function which authorizes Spotify for the current user
 * 
 * @async
 * @function authorizeUser
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns  {Promise}
 * @resolves {object}
 * @rejects  {Error}   The error which caused the authorize user failure
 */
export function authorizeUser(): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const isLoggedIn: boolean = await Spotify.isLoggedInAsync();

      if (!isLoggedIn) {
        await Spotify.login();
      }

      const spotifyUser: PrivateUser = await Spotify.getMe();
      const usersRef: FirestoreRef = firestore.collection('users');
      const userDoc: FirestoreDoc = await usersRef.doc(spotifyUser.id).get();

      if (userDoc.exists) {
        //console.log(58);
        const user = {
          id: spotifyUser.id,
          displayName: spotifyUser.display_name,
          spotifyAccountStatus: spotifyUser.product,
          country: spotifyUser.country,
          profileImage: userDoc.data().profileImage,
          coverImage: userDoc.data().coverImage,
          bio: userDoc.data().bio,
          location: userDoc.data().location,
          birthdate: userDoc.data().birthdate,
          website: userDoc.data().website,
          email: userDoc.data().email,
          favoriteTrackID: userDoc.data().favoriteTrackID,
          totalFollowers: userDoc.data().totals.followers,
          totalFollowing: userDoc.data().totals.following,
        };

        dispatch(actions.success());
        dispatch(updateOnboarding({onboarding: false}));
        dispatch(addEntities({users: {[user.id]: user}}));
        dispatch(updateUsers({currentUserID: user.id}));
        Actions.root({type: ActionConst.RESET});
        dispatch(getUserSettings(user.id));
      } else {
        //console.log(83);
        dispatch(actions.success());
        dispatch(updateOnboarding({onboarding: true}));
        // $FlowFixMe
        dispatch(createProfile(spotifyUser));
      }
    } catch (err) {
      //console.log(90);
      //console.log(err);
      dispatch(actions.failure(err));
    }
  };
}