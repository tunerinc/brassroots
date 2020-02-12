'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetMostPlayedTracks
 */

import Spotify from 'rn-spotify-sdk';
import addMusicItems from '../../../utils/addMusicItems';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/tracks';
import {
  type FirestoreInstance,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the most played tracks for the current user
 * 
 * @async
 * @function getMostPlayedTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID The user id of the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The most played tracks for the current user
 * @rejects  {Error}          The error which caused the get most played tracks failure
 */
export function getMostPlayedTracks(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const userTracksRef: FirestoreDocs = firestore.collection('users').doc(userID).collection('tracks');
      const userTrackDocs: FirestoreDocs = await userTracksRef.orderBy('plays', 'desc').limit(25).get();

      if (userTrackDocs.empty) {
        dispatch(actions.success());
      } else {
        const spotifyTracks = await Spotify.getTracks(userTrackDocs.docs.map(doc => doc.id), {});
        const music = addMusicItems(spotifyTracks.tracks);
        const mostPlayed = userTrackDocs.docs.map(doc => doc.id)
          .sort((a, b) => {
            const countA: number = typeof a === 'number' ? userTrackDocs.docs[a].data().plays : 0;
            const countB: number = typeof b === 'number' ? userTrackDocs.docs[b].data().plays : 0;
            return countA > countB ? -1 : countA < countB ? 1 : 0;
          });

        dispatch(addEntities({...music, users: {[userID]: {id: userID, mostPlayed}}}));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}