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
// import {setOnboarding} from '../../onboarding/SetOnboarding';
// import {getUserSettings} from '../GetUserSettings';
// import {createProfile} from '../../onboarding/CreateProfile';
// import {addCurrentUser} from '../../users/AddCurrentUser';
import * as actions from './actions';
import {
  type Action,
  type State,
  type ThunkAction,
} from '../../../reducers/settings';
import {type PrivateUser} from '../../../utils/spotifyAPI/types';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDocs,
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
    dispatch(actions.authorizeUserRequest());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const isLoggedIn: boolean = await Spotify.isLoggedInAsync();

      if (!isLoggedIn) {
        await Spotify.login();
      }

      const spotifyUser: PrivateUser = await Spotify.getMe();
      const usersRef: FirestoreRef = firestore.collection('users');
      const userDocs: FirestoreDocs = await usersRef.where('id', '==', spotifyUser.id).get();

      if (userDocs.empty) {
        dispatch(actions.authorizeUserSuccess());
        // dispatch(setOnboarding(true));
        // dispatch(createProfile(spotifyUser));
      } else {
        const users = userDocs.docs.map(doc => doc.data());
        const user = {
          id: spotifyUser.id,
          displayName: spotifyUser.display_name,
          spotifyAccountStatus: spotifyUser.product,
          country: spotifyUser.country,
          profileImage: users[0].profileImage,
          coverImage: users[0].coverImage,
          bio: users[0].bio,
          location: users[0].location,
          birthdate: users[0].birthdate,
          website: users[0].website,
          email: users[0].email,
          favoriteTrackID: users[0].favoriteTrackID,
          totalFollowers: users[0].totals.followers,
          totalFollowing: users[0].totals.following,
        }

        dispatch(actions.authorizeUserSuccess());
        // dispatch(addCurrentUser(user));
        // dispatch(setOnboarding(false));
        // dispatch(getUserSettings(user.id));
        Actions.root({type: ActionConst.RESET});
      };
    } catch (err) {
      dispatch(actions.authorizeUserFailure(err));
    }
  };
}