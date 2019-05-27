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
import {addTracks} from '../AddTracks';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
// import {addUserMostPlayed} from '../../users/AddUserMostPlayed';
import * as actions from './actions';
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
    dispatch(actions.getMostPlayedTracksRequest());

    const firestore: FirestoreInstance = getFirestore();

    try {
      const userTracksRef: FirestoreDocs = firestore.collection('users').doc(userID).collection('tracks');
      const userTrackDocs: FirestoreDocs = await userTracksRef.orderBy('plays', 'desc').limit(25).get();

      if (userTrackDocs.empty) {
        dispatch(actions.getMostPlayedTracksSuccess());
      } else {
        const spotifyTracks = await Spotify.getTracks(userTrackDocs.docs.map(doc => doc.id), {});

        const music = addMusicItems(spotifyTracks.tracks);
        const mostPlayedTracks = userTrackDocs.docs.map(doc => doc.id)
          .sort((a, b) => {
            const countA: number = typeof a === 'number' ? userTrackDocs.docs[a].data().plays : 0;
            const countB: number = typeof b === 'number' ? userTrackDocs.docs[b].data().plays : 0;

            return countA > countB ? -1 : countA < countB ? 1 : 0;
          });

        dispatch(addTracks(music.tracks));
        dispatch(addAlbums(music.albums));
        dispatch(addArtists(music.artists));
        // dispatch(addUserMostPlayed(userID, mostPlayedTracks));
        dispatch(actions.getMostPlayedTracksSuccess());
      }
    } catch (err) {
      dispatch(actions.getMostPlayedTracksFailure(err));
    }
  };
}