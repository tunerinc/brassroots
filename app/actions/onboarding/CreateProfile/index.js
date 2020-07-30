'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateProfile
 */

import moment from 'moment-timezone';
moment.tz.setDefault("America/Chicago");
import Spotify from 'rn-spotify-sdk';
import getUserTopTrack from '../../../utils/spotifyAPI/getUserTopTrack';
import addMusicItems from '../../../utils/addMusicItems';
import fetchRemoteURL from '../../../utils/fetchRemoteURL';
import {Actions} from 'react-native-router-flux';
import {addEntities} from '../../entities/AddEntities';
import {updateUsers} from '../../users/UpdateUsers';
import * as actions from './actions';
import {initialState} from '../../../reducers/settings';
import {type ThunkAction} from '../../../reducers/onboarding';
import {
  type PrivateUser,
  type FullTrack,
} from '../../../utils/spotifyAPI/types';
import {
  type Blob,
  type BRUser,
} from '../../../utils/brassrootsTypes';
import {
  type FirebaseInstance,
  type FirestoreInstance,
  type FirestoreRef,
  type StorageRef,
  type StorageUploadTask
} from '../../../utils/firebaseTypes';

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
    dispatch(actions.request());

    const firebase: FirebaseInstance = getFirebase();
    const firestore: FirestoreInstance = getFirestore();
    const storage: StorageRef = firebase.storage().ref();
    const usersRef: FirestoreRef = firestore.collection('users');
    const settingsRef: FirestoreRef = firestore.collection('settings');

    let batch = firestore.batch();

    try {
      const user: PrivateUser = spotifyUser ? spotifyUser : await Spotify.getMe();
      const topTrack = await getUserTopTrack();
      const fullTrack: FullTrack = await Spotify.getTrack(topTrack.items[0].id, {});
      const music = addMusicItems([fullTrack]);
      const hasImage: boolean = fullTrack.album.images.length !== 0;
      const coverURL: ?string = hasImage ? fullTrack.album.images[0].url : null;
      const profileURL: string = user.images.length > 0
        ? user.images[0].url
        : 'https://static1.squarespace.com/static/557d1981e4b097936a86b629/t/558cf487e4b05d368538793a/1435301000191/';

      const profileBlob: Blob = await fetchRemoteURL(profileURL, 'blob');
      const coverBlob: ?Blob = typeof coverURL === 'string'
        ? await fetchRemoteURL(coverURL, 'blob')
        : null;

      const profileTask: StorageUploadTask = storage.child(`profileImages/${user.id}`)
        .put(profileBlob);
      
      const coverTask: ?StorageUploadTask = coverBlob ? storage.child(`coverImages/${user.id}`)
        .put(coverBlob) : null;

      await Promise.all([profileTask, ...(coverTask ? [coverTask] : [])]);
      const profileImage: string = await profileTask.snapshot.ref.getDownloadURL();
      const coverImage: string = coverTask ? await coverTask.snapshot.ref.getDownloadURL() : '';
      const newUserProfile: BRUser = {
        profileImage,
        coverImage,
        id: user.id,
        displayName: user.display_name,
        birthdate: moment(user.birthdate).format('MMM D'),
        country: user.country,
        email: user.email,
        spotifyAccountStatus: user.product,
        favoriteTrackID: fullTrack.id,
      };

      dispatch(addEntities({...music, users: {[user.id]: newUserProfile}}));
      dispatch(updateUsers({currentUserID: user.id}));
      dispatch(actions.success());
      Actions.createProfile();

      batch.set(
        usersRef.doc(user.id),
        {
          ...newUserProfile,
          currentSession: null,
          online: false,
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
          version: initialState.version,
          soundEffects: true,
          theme: 'dark',
          language: 'english',
          region: user.country,
          notify: {
            session: 'following',
            chat: 'mentions',
            message: true,
            groupMessage: 'all',
            nearbySession: 'all',
            playlistChange: true,
            playlistJoin: true,
            likedTrack: true,
            newFollower: true,
          },
          preference: {
            playlist: 'limitless',
            session: 'radio',
            message: 'anyone',
            muteNearby: true,
          },
        }
      );

      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}