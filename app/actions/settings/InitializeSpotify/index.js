'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module InitializeSpotify
 */

import Spotify from 'rn-spotify-sdk';
import {Actions, ActionConst} from 'react-native-router-flux';
import * as actions from './actions';
import {getUserSettings} from '../GetUserSettings';
import {addEntities} from '../../entities/AddEntities';
import {updateOnboarding} from '../../onboarding/UpdateOnboarding';
import {updateUsers} from '../../users/UpdateUsers';
import envConfig from '../../../../env.json';
import {type ThunkAction} from '../../../reducers/settings';
import {type PrivateUser} from '../../../utils/spotifyAPI/types';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function that initializes Spotify for Ultrasound
 * 
 * @async
 * @function initializeSpotify
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @returns  {Promise}
 * @resolves {object}  Confirmation Spotify is now initialized
 * @rejects  {Error}   The error which caused the initialize spotify failure
 */
export function initializeSpotify(): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const initialized: boolean = await Spotify.isInitializedAsync();

      let loggedIn: boolean = false;

      if (!initialized) {
        loggedIn = await Spotify.initialize(
          {
            clientID: envConfig.clientID,
            sessionUserDefaultsKey: 'SpotifySession',
            redirectURL: envConfig.callbackURI,
            scopes: [
              'playlist-read-private',
              'playlist-modify-private',
              'playlist-modify-public',
              'user-follow-modify',
              'user-follow-read',
              'user-library-read',
              'user-library-modify',
              'user-read-private',
              'user-read-birthdate',
              'user-read-email',
              'streaming',
              'playlist-read-collaborative',
              'user-top-read',
            ],
            tokenSwapURL: envConfig.tokenSwapURL,
            tokenRefreshURL: envConfig.tokenRefreshURL,
          },
        );
      }

      if (loggedIn) {
        const spotifyUser: PrivateUser = await Spotify.getMe();
        const userDoc = await firestore.collection('users').doc(spotifyUser.id).get();

        if (userDoc.exists) {
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

          dispatch(actions.success(true));
          dispatch(updateOnboarding({onboarding: false}));
          dispatch(addEntities({users: {[user.id]: user}}));
          dispatch(updateUsers({currentUserID: user.id}));
          Actions.root({type: ActionConst.RESET});
          dispatch(getUserSettings(user.id));
        } else {
          dispatch(actions.success(false));
        }
      } else {
        dispatch(actions.success(false));
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}