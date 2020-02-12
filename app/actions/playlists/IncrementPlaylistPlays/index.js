'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module IncrementPlaylistPlays
 */

import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/playlists';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';

/**
 * Async function which increments the amount of plays on a playlist
 * 
 * @async
 * @function incrementPlaylistPlays
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID     The Brassroots id of the user who played the playlist
 * @param    {string}  playlistID The Brassroots id of the playlist to increment plays for
 * @param    {string}  trackID    The Spotify id of the track that was played from the playlist
 *
 * @returns  {Promise}
 * @resolves {object}             The playlist object with the new amount of plays
 * @rejects  {Error}              The error which caused the increment playlist plays failure
 */
export function incrementPlaylistPlays(
  userID: string,
  playlistID: string,
  trackID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const userRef: FirestoreDoc = firestore.collection('users').doc(userID);
    const playlistRef: FirestoreDoc = userRef.collection('playlists').doc(playlistID);
    const playlistTrackRef: FirestoreDoc = playlistRef.collection('tracks').doc(trackID);

    try {
      const playlistTransaction = firestore.runTransaction(async transaction => {
        const doc = await transaction.get(playlistRef);

        if (!doc.exists) {
          throw new Error('Unable to retrieve playlist from Brassroots');
        }

        const {plays} = doc.data();

        transaction.update(playlistRef, {plays: plays + 1});

        return plays + 1;
      });

    const trackTransaction = firestore.runTransaction(async transaction => {
      const doc = await transaction.get(playlistTrackRef);

      if (!doc.exists) {
        throw new Error('Unable to retrieve playlist track from Brassroots');
      }

      const {plays} = doc.data();

      transaction.update(playlistTrackRef, {plays: plays + 1});

      return plays + 1;
    });

    const promises = [playlistTransaction, trackTransaction];
    const totals: Array<number> = await Promise.all(promises);
    const [playlistCount, trackCount] = totals;

    dispatch(
      addEntities(
        {
          playlists: {[playlistID]: {userPlays: playlistCount, id: playlistID}},
          playlistTracks: {[trackID]: {userPlays: trackCount, id: trackID}},
        },
      ),
    );

    dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
