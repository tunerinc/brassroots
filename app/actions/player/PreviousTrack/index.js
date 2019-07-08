'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PreviousTrack
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
import {GeoFirestore} from 'geofirestore';
import {addRecentTrack} from '../../tracks/AddRecentTrack';
import * as actions from './actions';
import {type TrackArtist} from '../../../reducers/tracks';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type User = {
  id: string,
  username: string,
  profileImage: string,
};

type Session = {
  id: string,
  totalPlayed: number,
  totalUsers: number,
  coords?: {
    lat: number,
    lon: number,
  },
  current: {
    id: string,
    userID: string,
    totalLikes: number,
    prevTrackID: string,
    nextTrackID: string,
    track: {
      trackID?: string,
      timeAdded?: string | number,
      id: string,
      name: string,
      trackNumber: number,
      durationMS: number,
      artists: Array<TrackArtist>,
      album: {
        id: string,
        name: string,
        small: string,
        medium: string,
        large: string,
        artists: Array<TrackArtist>,
      },
    },
  },
  prevTrack: {
    prevTrackID?: string,
    id: string,
    name: string,
    durationMS: number,
    album: {
      id: string,
      name: string,
      small?: string,
      medium?: string,
      large?: string,
    },
    artists: Array<
      {
        id: string,
        name: string,
      }
    >,
  },
};

/**
 * Async function which plays the previous track in the queue
 * 
 * @async
 * @function previousTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {object}   user
 * @param    {string}   user.id
 * @param    {string}   user.username
 * @param    {string}   user.profileImage
 * @param    {object}   session
 * @param    {string}   session.id
 * @param    {number}   session.totalPlayed
 * @param    {number}   session.totalUsers
 * @param    {object}   [session.coords]
 * @param    {number}   session.coords.lat
 * @param    {number}   session.coords.lon
 * @param    {object}   session.current
 * @param    {string}   session.current.id
 * @param    {string}   session.current.userID
 * @param    {number}   session.current.totalLikes
 * @param    {string}   session.current.prevTrackID
 * @param    {string}   session.current.nextTrackID
 * @param    {string}   session.current.track.id
 * @param    {string}   session.current.track.name
 * @param    {number}   session.current.track.trackNumber
 * @param    {number}   session.current.track.durationMS
 * @param    {object}   session.current.track.album
 * @param    {string}   session.current.track.album.id
 * @param    {string}   session.current.track.album.name
 * @param    {string}   [session.current.track.album.small]
 * @param    {string}   [session.current.track.album.medium]
 * @param    {string}   [session.current.track.album.large]
 * @param    {object[]} session.current.track.artists
 * @param    {string}   session.current.track.artists.id
 * @param    {string}   session.current.track.artists.name
 * @param    {object}   session.prevTrack
 * @param    {string}   [session.prevTrack.prevTrackID]
 * @param    {string}   session.prevTrack.id
 * @param    {string}   session.prevTrack.name
 * @param    {number}   session.prevTrack.durationMS
 * @param    {object}   session.prevTrack.album
 * @param    {string}   session.prevTrack.album.id
 * @param    {string}   session.prevTrack.album.name
 * @param    {string}   [session.prevTrack.album.small]
 * @param    {string}   [session.prevTrack.album.medium]
 * @param    {string}   [session.prevTrack.album.large]
 * @param    {object[]} session.prevTrack.artists
 * @param    {string}   session.prevTrack.artists.id
 * @param    {string}   session.prevTrack.artists.name
 *
 * @returns  {Promise}
 * @resolves {object}                     The now playing session with the previous track playing
 * @reject   {Error}                      The error which caused the previous track failure
 */
export function previousTrack(
  user: User,
  session: Session,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.previousTrackRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const sessionPrevRef: FirestoreDocs = sessionRef.collection('previouslyPlayed');
    const sessionQueueRef: FirestoreDocs = sessionRef.collection('queue');
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(user.id);
    const geoRef: FirestoreRef = firestore.collection('geo');
    const geoFirestore = new GeoFirestore(geoRef);
    const {coords, current, prevTrack, totalPlayed, totalUsers} = session;
    const {prevTrackID, ...track} = prevTrack;

    try {
      dispatch(addRecentTrack(user.id, current.track));

      const queueDoc = sessionQueueRef.doc();
      const queueID = queueDoc.id;

      let batch: FirestoreBatch = firestore.batch();

      batch.update(sessionUserRef, {progress: 0, paused: false});
      batch.delete(sessionQueueRef.doc(current.id));
      batch.set(
        sessionPrevRef.doc(current.id),
        {
          id: current.id,
          trackID: current.track.id,
          userID: current.userID,
          totalLikes: current.totalLikes,
          prevTrackID: current.prevTrackID,
          nextTrackID: queueID,
        }
      );

      batch.set(
        sessionQueueRef.doc(queueID),
        {
          track,
          user,
          id: queueID,
          added: true,
          prevTrackID: current.id,
          nextTrackID: current.nextTrackID || null,
          totalLikes: 0,
          likes: [],
        }
      );

      if (current.nextTrackID) {
        batch.update(sessionQueueRef.doc(current.nextTrackID), {prevTrackID: queueID});
      }

      batch.update(
        sessionRef,
        {
          progress: 0,
          currentQueueID: queueID,
          currentTrackID: track.id,
          timeLastPlayed: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          paused: false,
          'totals.previouslyPlayed': totalPlayed + 1,
        }
      );

      const promises = [
        batch.commit(),
        Spotify.playURI(`spotify:track:${track.id}`, 0, 0),
        ...(coords
          ? [geoFirestore.set(
            session.id,
            {
              id: session.id,
              currentQueueID: queueID,
              currentTrackID: track.id,
              coordinates: new firestore.GeoPoint(coords.lat, coords.lon),
              totalListeners: totalUsers,
              type: 'session',
              owner: {
                id: user.id,
                name: user.username,
                image: user.profileImage,
              },
            },
          )]
          : []
        ),
      ];

      await Promise.all(promises);
      dispatch(
        actions.previousTrackSuccess(
          queueID,
          track.id,
          track.durationMS,
          prevTrackID,
          prevTrack.id,
        ),
      );
    } catch (err) {
      dispatch(actions.previousTrackFailure(err));
    }
  };
}
