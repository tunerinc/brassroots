'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateProfile
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
import fetchRemoteURL from '../../../utils/fetchRemoteURL';
import {Actions} from 'react-native-router-flux';
// import {addCurrentUser} from '../../users/AddCurrentUser';
import * as actions from './actions';
import type {Action, State} from '../../../reducers/onboarding';
import type {PrivateUser} from '../../../utils/spotifyAPI/types';
import type {Blob, BRUser} from '../../../utils/brassrootsTypes';
import type {
  Firebase,
  FirebaseInstance,
  FirestoreInstance,
  FirestoreRef,
  StorageRef,
  StorageUploadTask
} from '../../../utils/firebaseTypes';

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

/**
 * Async function that creates a profile on Ultrasound for the current user
 * 
 * @async
 * @function createProfile
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {object}  [spotifyUser=null] The current user's user object from Spotify
 *
 * @returns  {Promise}
 * @resolves {object}                     Confirmation the current user's profile was created
 * @rejects  {Error}                      The error which caused the create profile failure
 */
export function createProfile(
  spotifyUser: ?PrivateUser = null,
): ThunkAction {
  return async (dispatch, _, {getFirebase, getFirestore}) => {
    dispatch(actions.createProfileRequest());

    const firebase: FirebaseInstance = getFirebase();
    const firestore: FirestoreInstance = getFirestore();
    const storage: StorageRef = firebase.storage().ref();
    const usersRef: FirestoreRef = firestore.collection('users');
    const settingsRef: FirestoreRef = firestore.collection('settings');

    try {
      const user: PrivateUser = spotifyUser ? spotifyUser : await Spotify.getMe();
      const profileImage: string = user.images.length > 0
        ? user.images[0].url
        : 'https://static1.squarespace.com/static/557d1981e4b097936a86b629/t/558cf487e4b05d368538793a/1435301000191/';

      const blob: Blob = await fetchRemoteURL(profileImage, 'blob');
      const uploadTask: StorageUploadTask = storage.child(`profileImages/${user.id}`).put(blob);
      await uploadTask;
      const url: string = await uploadTask.snapshot.ref.getDownloadURL();
      const newUserProfile: BRUser = {
        id: user.id,
        displayName: user.display_name,
        birthdate: moment(user.birthdate).format('MMM D'),
        country: user.country,
        email: user.email,
        profileImage: url,
      };

      let batch = firestore.batch();

      batch.set(
        usersRef.doc(user.id),
        {
          ...newUserProfile,
          spotifyAccountStatus: user.product,
          currentSession: null,
          favoriteTrackID: null,
          online: false,
          coverImage: null,
          bio: null,
          location: null,
          website: null,
          totals: {
            "blocked": 0,
            "conversations": 0,
            "feedback": 0,
            "followingGroups": 0,
            "followers": 0,
            "following": 0,
            "memberInGroups": 0,
            "recentlyPlayed": 0,
            "searches": 0
          },
        }
      );

      batch.set(
        settingsRef.doc(user.id),
        {
          id: user.id,
          notifDirectMessage: true,
          notifGroupDirectMessage: 'all',
          language: 'english',
          notifLikedSong: true,
          notifLiveSessionChat: 'mentions',
          notifLiveSession: 'following',
          notifNearbyLiveSession: 'all',
          notifNewFollower: true,
          notifPlaylistChange: true,
          notifPlaylistJoin: true,
          prefMessage: 'anyone',
          prefPlaylist: 'limitless',
          prefSession: 'radio',
          prefMuteNearby: false,
          region: user.country,
          soundEffects: true,
          theme: 'dark',
        }
      );

      await batch.commit();

      // dispatch(
      //   addCurrentUser(
      //     {
      //       ...newUserProfile,
      //       spotifyAccountStatus: user.product,
      //       coverImage: '',
      //       bio: '',
      //       location: '',
      //       website: '',
      //       favoriteTrackID: null,
      //       totalFollowers: 0,
      //       totalFollowing: 0,
      //     },
      //   ),
      // );

      dispatch(actions.createProfileSuccess());
      Actions.createProfile();
    } catch (err) {
      dispatch(actions.createProfileFailure(err));
    }
  };
}