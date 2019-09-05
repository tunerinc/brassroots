'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddRecentTrack
 */

import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {
  type ThunkAction,
  type TrackArtist,
} from '../../../reducers/tracks';
import {
  type FirestoreInstance,
  type FirestoreDocs,
  type FirestoreDoc,
  type FirestoreBatch,
} from "../../../utils/firebaseTypes";

type Track = {
  +trackID?: string,
  +timeAdded?: string | number,
  +id: string,
  +name: string,
  +trackNumber: number,
  +durationMS: number,
  +artists: Array<TrackArtist>,
  +album: {
    +id: string,
    +name: string,
    +small: string,
    +medium: string,
    +large: string,
    +artists: Array<TrackArtist>,
  },
};

/**
 * Async function that adds a recent track for the current user
 * 
 * @async
 * @function addRecentTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}   userID                   The user id to add the recent track for
 * @param    {object}   track                    The most recent track to add to the user
 * @param    {string}   track.id                 The Spotify id of the track
 * @param    {string}   track.name               The name of the track
 * @param    {number}   track.trackNumber        The track number of the track within the album
 * @param    {number}   track.durationMS         The duration of the track in milliseconds
 * @param    {object}   track.album              The album the track is apart of
 * @param    {string}   track.album.id           The Spotify id of the track's album
 * @param    {string}   track.album.name         The name of the track's album
 * @param    {string}   track.album.small        A 64x64 size of the album's artwork
 * @param    {string}   track.album.medium       A 320x320 size of the album's artwork
 * @param    {string}   track.album.large        A 640x640 size of the album's artwork
 * @param    {object[]} track.album.artists      The album artists
 * @param    {string}   track.album.artists.id   The Spotify id of the album artist
 * @param    {string}   track.album.artists.name The name of the album artist
 * @param    {object[]} track.artists            The track artists
 * @param    {string}   track.artists.id         The Spotify id of the track artist
 * @param    {string}   track.artists.name       The name of the track artist
 * 
 * @return   {Promise}
 * @resolves {object}                            The most recent track that was added for the current user
 * @rejects  {Error}                             The error which caused the add recent track failure
 */
export function addRecentTrack(
  userID: string,
  track: Track,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const recentRef: FirestoreDocs = firestore.collection('users').doc(userID).collection('recentlyPlayed');
    const newRecentDoc: FirestoreDoc = recentRef.doc();
    const newRecentID: string = newRecentDoc.id;
    const recentTrack: Track = updateObject(track, {
      id: newRecentID,
      trackID: track.id,
      timeAdded: firestore.FieldValue.serverTimestamp(),
    });

    let batch: FirestoreBatch = firestore.batch();

    try {
      const duplicateDocs: FirestoreDocs = await recentRef.where('trackID', '==', track.id).get();

      batch.set(recentRef.doc(newRecentID), recentTrack);

      if (!duplicateDocs.empty && Array.isArray(duplicateDocs)) {
        duplicateDocs.forEach(doc => batch.delete(recentRef.doc(doc.id)));
      }

      await batch.commit();
      dispatch(addEntities({users: {[userID]: {id: userID, recentlyPlayed: [track.id]}}}));
      dispatch(actions.success());
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}