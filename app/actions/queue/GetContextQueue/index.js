'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetContextQueue
 */

import Spotify from 'rn-spotify-sdk';
import addMusicItems from '../../../utils/addMusicItems';
import getPlaylistTracks from '../../../utils/spotifyAPI/getPlaylistTracks';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {type Paging} from '../../../utils/spotifyAPI/types';
import {
  type BRUserTrack,
  type BRUserRecent,
} from '../../../utils/brassrootsTypes';
import {
  type ThunkAction,
  type Context,
} from '../../../reducers/queue';
import {
  type FirestoreInstance,
  type FirestoreQuery,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreRef,
} from '../../../utils/firebaseTypes';

/**
 * Async function that retrieves the next 3 tracks from a session's context
 * 
 * @async
 * @function getContextQueue
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {object}        context          The context from the current session
 * @param    {string}        context.id       The id of the context
 * @param    {string}        context.type     The type of context the session is playing from, 
 * @param    {number}        context.total    The total amount of items from the context already stored in Redux
 * @param    {number|string} context.position The position from which to retrieve the next tracks
 * @param    {string[]}      [context.tracks] The Spotify ids of the tracks in the context queue
 * 
 * @returns  {Promise}
 * @resolves {object}                         The tracks retrieved from the context of a session
 * @rejects  {Error}                          The error which caused the get context queue failure
 */
export function getContextQueue(
  context: Context,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const limit = context && typeof context.total === 'number' ? 3 - context.total : 3;
    const userRef: FirestoreDoc = firestore.collection('users').doc(context.id);
    const mostRef: FirestoreQuery = userRef.collection('tracks').orderBy('plays', 'desc');
    const recentRef: FirestoreQuery = userRef.collection('recentlyPlayed').orderBy('timeAdded', 'desc');
    const playlistOptions = {
      limit,
      offset: typeof context.position === 'number' ? context.position : 0,
      fields: 'items(track(id,name,track_number,duration_ms,album(id,name,images,artists),artists))',
      market: 'US',
    };

    let spotifyTracks = [];
    
    try {
      if (context.tracks && Array.isArray(context.tracks)) {
        spotifyTracks = await Spotify.getTracks(context.tracks, {});
      } else if (context.type === 'playlist' && typeof context.id === 'string') {
        spotifyTracks = await getPlaylistTracks(context.id, playlistOptions);
      } else if (context.type === 'user-most' && context.position) {
        const mostTracks: FirestoreDocs = await mostRef.startAfter(context.position).limit(limit).get();
        spotifyTracks = await Spotify.getTracks(mostTracks.docs.map(t => t.id), {});
      } else if (context.type === 'user-recently' && context.position) {
        const recentTracks: FirestoreDocs = await recentRef.startAfter(context.position).limit(limit).get();

        spotifyTracks = recentTracks.docs.map(track => {
          return {
            ...track.data(),
            id: track.data().trackID,
            trackID: null,
            timeAdded: null,
          };
        });
      }

      const music = addMusicItems(spotifyTracks);

      dispatch(addEntities(music));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}