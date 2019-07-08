'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetArtistTopTracks
 */

import Spotify from 'rn-spotify-sdk';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import addMusicItems from '../../../utils/addMusicItems';
import * as actions from './actions';
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
    dispatch(actions.getArtistTopTracksRequest());

    const firestore: FirestoreInstance = getFirestore();
    const artistTracksRef: FirestoreDocs = firestore
      .collection('artists')
      .doc(artistID)
      .collection('tracks');

    try {
      const trackDocs: FirestoreDocs = await artistTracksRef.orderBy('plays', 'desc').limit(3).get();

      if (trackDocs.empty) {
        dispatch(actions.getArtistTopTracksSuccess(artistID, []));
      } else {
        const trackIDs = trackDocs.docs.map(doc => doc.id);
        const tracksRes = await Spotify.getTracks(trackIDs, {});

        let music = {
          tracks: {},
          albums: {},
          artists: {},
        };

        music = addMusicItems(tracksRes.tracks, music);

        dispatch(addAlbums(music.albums));
        dispatch(addArtists(music.artists));
        dispatch(addTracks(music.tracks));
        dispatch(actions.getArtistTopTracksSuccess(artistID, trackIDs));
      }
    } catch (err) {
      dispatch(actions.getArtistTopTracksFailure(err));
    }
  };
}

