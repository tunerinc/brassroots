'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetMostPlayedSpotifyTrack
 */

import Spotify from 'rn-spotify-sdk';
import getUserTopTrack from '../../../utils/spotifyAPI/getUserTopTrack';
import addMusicItems from '../../../utils/addMusicItems';
import fetchRemoteURL from '../../../utils/fetchRemoteURL';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/tracks';
import {type Blob} from '../../../utils/brassrootsTypes';
import {
  type Paging,
  type FullTrack,
} from '../../../utils/spotifyAPI/types';
import {
  type FirestoreInstance,
  type FirebaseInstance,
  type FirestoreDoc,
  type FirestoreBatch,
  type StorageRef,
  type StorageChild,
  type StorageUploadTask,
} from '../../../utils/firebaseTypes';

/**
 * Async function that gets the current user's most played Spotify track
 * 
 * @async
 * @function getMostPlayedSpotifyTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The most played track of the current user from Spotify
 * @reject   {Error}          The error which caused the get most played spotify track FAILURE
 */
export function getMostPlayedSpotifyTrack(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirebase, getFirestore}) => {
    dispatch(actions.request());

    const firebase: FirebaseInstance = getFirebase();
    const firestore: FirestoreInstance = getFirestore();
    const storage: StorageRef = firebase.storage().ref();
    const userDoc: FirestoreDoc = firestore.collection('users').doc(userID);

    try {
      const res = await getUserTopTrack();
      const track: FullTrack = await Spotify.getTrack(res.items[0].id, {});
      const music = addMusicItems([track]);

      let batch: FirestoreBatch = firestore.batch();

      if (track.album.images.length !== 0) {
        const blob: Blob = await fetchRemoteURL(track.album.images[0].url, 'blob');
        const uploadTask: StorageUploadTask = storage.child(`coverImages/${userID}`).put(blob);
        await uploadTask;

        const coverImage: string = await uploadTask.snapshot.ref.getDownloadURL();
        batch.update(userDoc, {coverImage});
        dispatch(addEntities({users: {[userID]: {id: userID, coverImage}}}));
      } else {
        batch.update(userDoc, {coverImage: ''});
      }

      batch.update(userDoc, {favoriteTrackID: track.id});

      await batch.commit();

      dispatch(addEntities({...music, users: {[userID]: {id: userID, favoriteTrackID: track.id}}}));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}