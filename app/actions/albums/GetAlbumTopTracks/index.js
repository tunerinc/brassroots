'use strict';

/**
 * @format
 * @flow
 */

import Spotify from 'rn-spotify-sdk';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import addMusicItems from '../../../utils/addMusicItems';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/albums';
import {
  type FirestoreInstance,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';
import {type Paging} from '../../../utils/spotifyAPI/types';

/**
 * @module GetAlbumTopTracks
 */

/**
 * Async function which gets the top tracks from an album
 * 
 * @async
 * @function getAlbumTopTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  albumID The album id which to get the top tracks from
 *
 * @returns  {Promise}
 * @resolves {object}          The getd top tracks from an album
 * @rejects  {Error}           The error which caused the get album top tracks failure
 */
export function getAlbumTopTracks(
  albumID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.getAlbumTopTracksRequest());

    const firestore: FirestoreInstance = getFirestore();
    const albumTracksRef: FirestoreDocs = firestore.collection('albums').doc(albumID).collection('tracks');

    try {
      const trackDocs: FirestoreDocs = await albumTracksRef.orderBy('plays', 'desc').limit(3).get();

      if (trackDocs.empty) {
        dispatch(actions.getAlbumTopTracksSuccess(albumID, []));
      } else {
        const trackIDs: Array<string> = trackDocs.docs.map(doc => doc.id);
        const tracksRes = await Spotify.getTracks(trackIDs, {});

        let music = {
          tracks: {},
          albums: {},
          tracks: {},
        };

        music = addMusicItems(tracksRes.tracks, music);

        dispatch(addArtists(music.artists));
        dispatch(addTracks(music.tracks));
        dispatch(actions.getAlbumTopTracksSuccess(albumID, trackIDs));
      }
    } catch (err) {
      dispatch(actions.getAlbumTopTracksFailure(err));
    }
  };
}