'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module InitializeSpotify
 */

import Spotify from 'rn-spotify-sdk';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as actions from './actions';
import { getUserSettings } from '../GetUserSettings';
import { addEntities } from '../../entities/AddEntities';
import { updateOnboarding } from '../../onboarding/UpdateOnboarding';
import { updateUsers } from '../../users/UpdateUsers';
import envConfig from '../../../../env.json';
import { type ThunkAction } from '../../../reducers/settings';
import { type PrivateUser } from '../../../utils/spotifyAPI/types';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';
import { type Context } from '../../../reducers/queue';
import { type TrackArtist } from '../../../reducers/tracks';
import store from '../../../store/configureStore';
import { leaveSession } from '../../sessions/LeaveSession';

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
  return async (dispatch, _, { getFirestore }) => {
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
        // const userDoc = userRef.get();

        if (userDoc.exists) {
          store().getState().socket.emit("init", spotifyUser.id);
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
            currentSession: userDoc.data().currentSession,
          };

          if (user.currentSession) {
            const sessionRef = firestore.collection('sessions').doc(user.currentSession);
            const sessionUserRef = sessionRef.collection('users').doc(spotifyUser.id);
            const userRef = firestore.collection('users').doc(spotifyUser.id);

            const session = await sessionRef.get();
            const sessionUser = await sessionUserRef.get();

            const owner = {
              id: session.data().owner.id,
              name: session.data().owner.name,
              image: session.data().owner.image,
            };

            // if (session.data().owner.id == user.id) {
            //   if (sessionUser.exists || session.data().totals.listeners > 1) {
            //     if (sessionUser.data().active) {
            //       await sessionUserRef.update({ active: false, });
            //       const { totals: { listeners, users } } = session.data();

            //       const sessionUsers = await sessionRef.collection('users').where('active', '==', true).get();
            //       const newOwnerDoc = sessionUsers.docs[Math.floor(Math.random() * sessionUsers.docs.length)];

            //       await sessionRef.update(
            //         {
            //           "totals.listeners": listeners - 1,
            //           "owner.id": newOwnerDoc.data().id,
            //           "owner.name": newOwnerDoc.data().displayName,
            //           "owner.image": newOwnerDoc.data().profileImage,
            //         }
            //       );
            //     }
            //   }

            //   if (session.data().totals.listeners === 1) sessionRef.update({ live: false, paused: true, prevOwner: null, });
            //   userRef.update({ currentSession: null, });
            // }

            const { totals: { listeners, users } } = session.data();
            
            if (sessionUser.exists && sessionUser.data().active) {
              if (session.data().owner.id == user.id) {
                await sessionUserRef.update({ active: false, });

                if (session.data().totals.listeners > 1) {
                  const sessionUsers = await sessionRef.collection('users').where('active', '==', true).get();
                  const newOwnerDoc = sessionUsers.docs[Math.floor(Math.random() * sessionUsers.docs.length)];

                  await sessionRef.update(
                    {
                      "totals.listeners": listeners - 1,
                      "owner.id": newOwnerDoc.data().id,
                      "owner.name": newOwnerDoc.data().displayName,
                      "owner.image": newOwnerDoc.data().profileImage,
                    }
                  );
                } else {
                  sessionRef.update({ live: false, paused: true, prevOwner: null, });
                }

              } else {
                await sessionRef.update({ "totals.listeners": listeners - 1, });
              }
              userRef.update({ currentSession: null, });
            }
          }

          dispatch(updateOnboarding({ onboarding: false }));
          dispatch(addEntities({ users: { [user.id]: user } }));
          dispatch(updateUsers({ currentUserID: user.id }));
          Actions.root({ type: ActionConst.RESET });
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