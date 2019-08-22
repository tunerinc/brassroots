'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopTracks
 */

import Spotify from 'rn-spotify-sdk';
import addMusicItems from '../../../utils/addMusicItems';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type ThunkAction} from '../../../reducers/artists';
import {
  type FirestoreInstance,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the top tracks from an artist
 * 
 * @async
 * @function getArtistTopTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  artistID The artist id to get top tracks of
 *
 * @returns  {Promise}
 * @resolves {object}           The top tracks from an artist
 * @rejects  {Error}            The error which caused the get artist top tracks failure
 */
export function getArtistTopTracks(
  artistID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const artistTracksRef: FirestoreDocs = firestore
      .collection('artists')
      .doc(artistID)
      .collection('tracks');

    try {
      const trackDocs: FirestoreDocs = await artistTracksRef.orderBy('plays', 'desc').limit(3).get();

      if (trackDocs.empty) {
        dispatch(actions.success());
      } else {
        const topTracks = trackDocs.docs.map(doc => doc.id);
        const tracksRes = await Spotify.getTracks(topTracks, {});
        const music = addMusicItems(
          tracksRes.tracks,
          {artists: {[artistID]: {topTracks, id: artistID}}, albums: {}, tracks: {}},
        );

        dispatch(addEntities(music));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}

