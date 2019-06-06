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
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../AddTracks';
// import {addCoverImage} from '../../users/AddCoverImage';
// import {addFavoriteTrack} from '../../users/AddFavoriteTrack';
import * as actions from './actions';
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
    dispatch(actions.getMostPlayedSpotifyTrackRequest());

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

        const url: string = await uploadTask.snapshot.ref.getDownloadURL();
        batch.update(userDoc, {coverImage: url});
        // dispatch(addCoverImage(url));
      } else {
        batch.update(userDoc, {coverImage: ''});
      }

      batch.update(userDoc, {favoriteTrackID: track.id});

      await batch.commit();

      dispatch(addAlbums(music.albums));
      dispatch(addArtists(music.artists));
      dispatch(addTracks(music.tracks));
      // dispatch(addFavoriteTrack(track.id));
      dispatch(actions.getMostPlayedSpotifyTrackSuccess());
    } catch (err) {
      dispatch(actions.getMostPlayedSpotifyTrackFailure(err));
    }
  };
}