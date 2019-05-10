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
import {authorizeUserSuccess} from '../AuthUser/actions';
// import {setOnboarding} from '../../onboarding/SetOnboarding';
// import {addCurrentUser} from '../../users/AddCurrentUser';
import {getUserSettings} from '../GetUserSettings';
import * as actions from './actions';
import envConfig from '../../../../env.json';
import type {Action, State} from '../../../reducers/settings';
import type {PrivateUser} from '../../../utils/spotifyAPI/types';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreRef,
  FirestoreDocs
} from '../../../utils/firebaseTypes';

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

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
    dispatch(actions.initializeSpotifyRequest());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const initialized: Promise<boolean> = await Spotify.isInitializedAsync();

      let loggedIn: boolean | Promise<boolean> = false;

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
          }
        );
      };

      if (loggedIn) {
        const spotifyUser: PrivateUser = await Spotify.getMe();
        const usersRef: FirestoreRef = firestore.collection('users');
        const userDocs: FirestoreDocs = await usersRef.where('id', '==', spotifyUser.id).get();

        if (userDocs.empty) {
          dispatch(actions.initializeSpotifySuccess(false));
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

          dispatch(actions.initializeSpotifySuccess(true));
          dispatch(authorizeUserSuccess());
          // dispatch(addCurrentUser(user));
          // dispatch(setOnboarding(false));
          dispatch(getUserSettings(user.id));
          Actions.root({type: ActionConst.RESET});
        }
      } else {
        dispatch(actions.initializeSpotifySuccess(false));
      }
    } catch (err) {
      dispatch(actions.initializeSpotifyFailure(err));
    }
  };
}