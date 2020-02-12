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
// import {GeoFirestore} from 'geofirestore';
import * as actions from './actions';
import {addRecentTrack} from '../../tracks/AddRecentTrack';
import {addEntities} from '../../entities/AddEntities';
import {type TrackArtist} from '../../../reducers/tracks';
import {type ThunkAction} from '../../../reducers/player';
import {type FullTrack} from '../../../utils/spotifyAPI/types';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type User = {
  id: string,
  displayName: string,
  profileImage: string,
};

type Session = {
  id: string,
  totalPlayed: number,
  coords?: {
    lat: number,
    lon: number,
  },
  current: {
    id: string,
    userID: string,
    totalLikes: number,
    prevQueueID: string,
    prevTrackID: string,
    nextQueueID: string,
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
};

/**
 * Async function which plays the previous track in the queue
 * 
 * @async
 * @function previousTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {object}   user                                     The current user
 * @param    {string}   user.id                                  The Spotify id of the current user
 * @param    {string}   user.displayName                         The display name of the current user
 * @param    {string}   user.profileImage                        The profile image of the current user
 * @param    {object}   session                                  The session the current user is in
 * @param    {string}   session.id                               The Brassroots id of the current session
 * @param    {number}   session.totalPlayed                      The total amount of tracks that have been played
 * @param    {object}   [session.coords]                         The coordinates of the session
 * @param    {number}   session.coords.lat                       The latitude value of the session
 * @param    {number}   session.coords.lon                       The longitude value of the session
 * @param    {object}   session.current                          The queue track that is currently playing
 * @param    {string}   session.current.id                       The Brassroots id of the current track
 * @param    {string}   session.current.userID                   The Spotify id of the user who added the current track
 * @param    {number}   session.current.totalLikes               The total amount of likes on the current track
 * @param    {string}   session.current.prevQueueID              The Brassroots id of the previous track to play
 * @param    {string}   session.current.prevTrackID              The Spotify id of the previous track to play
 * @param    {string}   session.current.nextQueueID              The Brassroots id of the next track to play
 * @param    {string}   session.current.nextTrackID              The Spotify id fo the next track to play
 * @param    {string}   session.current.track.id                 The Spotify id of the current track
 * @param    {string}   session.current.track.name               The name of the track
 * @param    {number}   session.current.track.trackNumber        The track number for the track inside the album
 * @param    {number}   session.current.track.durationMS         The duration of the track in milliseconds
 * @param    {object}   session.current.track.album              The album the track is in
 * @param    {string}   session.current.track.album.id           The Spotify id of the track's album
 * @param    {string}   session.current.track.album.name         The name of the album
 * @param    {string}   [session.current.track.album.small]      64x64 size of the album's artwork
 * @param    {string}   [session.current.track.album.medium]     320x320 size of the album's artwork
 * @param    {string}   [session.current.track.album.large]      640x640 size of the album's artwork
 * @param    {object[]} session.current.track.album.artists      The album artists
 * @param    {string}   session.current.track.album.artists.id   The Spotfy id of the album artist
 * @param    {string}   session.current.track.album.artists.name The name of the album artists
 * @param    {object[]} session.current.track.artists            The track artists
 * @param    {string}   session.current.track.artists.id         The Spotify id of the track artist
 * @param    {string}   session.current.track.artists.name       The name of the track artist
 *
 * @returns  {Promise}
 * @resolves {object}                                            The now playing session with the previous track playing
 * @reject   {Error}                                             The error which caused the previous track failure
 */
export function previousTrack(
  user: User,
  session: Session,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const sessionPrevRef: FirestoreDocs = sessionRef.collection('previouslyPlayed');
    const sessionQueueRef: FirestoreDocs = sessionRef.collection('queue');
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(user.id);
    // const geoRef: FirestoreRef = firestore.collection('geo');
    // const geoFirestore = new GeoFirestore(geoRef);
    const {coords, current, totalPlayed} = session;

    let batch: FirestoreBatch = firestore.batch();

    try {
      // dispatch(addRecentTrack(user.id, current.track));

      const queueDoc = sessionQueueRef.doc();
      const queueID = queueDoc.id;
      const [prevDoc, currentDoc] = await Promise.all(
        [
          sessionPrevRef.doc(current.prevQueueID).get(),
          sessionQueueRef.doc(current.id).get(),
        ],
      );

      if (!prevDoc.exists || !currentDoc.exists) {
        throw new Error('Unable to retrieve tracks from Firestore.');
      }

      await Spotify.playURI(`spotify:track:${prevDoc.data().track.id}`, 0, 0);

      dispatch(
        addEntities(
          {
            sessions: {
              [session.id]: {
                id: session.id,
                currentTrackID: prevDoc.data().track.id,
                currentQueueID: queueID,
              },
            }
          },
        ),
      );

      dispatch(
        actions.success(
          queueID,
          prevDoc.data().track.id,
          prevDoc.data().track.durationMS,
          prevDoc.data().prevQueueID,
          prevDoc.data().prevTrackID,
        ),
      );

      batch.update(sessionUserRef, {progress: 0, paused: false});
      batch.set(
        sessionPrevRef.doc(current.id),
        {
          id: current.id,
          userID: current.userID,
          totalLikes: current.totalLikes,
          prevQueueID: currentDoc.data().prevQueueID,
          prevTrackID: currentDoc.data().prevTrackID,
          nextQueueID: queueID,
          nextTrackID: prevDoc.data().track.id,
          track: {...current.track},
        }
      );

      batch.set(
        sessionQueueRef.doc(queueID),
        {
          user,
          id: queueID,
          added: true,
          prevQueueID: current.id,
          prevTrackID: current.track.id,
          nextQueueID: current.nextQueueID || null,
          nextTrackID: current.nextTrackID || null,
          timeAdded: firestore.FieldValue.serverTimestamp(),
          isCurrent: true,
          totalLikes: 0,
          likes: [],
          track: {...prevDoc.data().track},
        }
      );

      if (current.nextQueueID && current.nextTrackID) {
        batch.update(
          sessionQueueRef.doc(current.nextQueueID),
          {prevQueueID: queueID, prevTrackID: current.nextTrackID},
        );
      }

      batch.update(
        sessionRef,
        {
          progress: 0,
          currentQueueID: queueID,
          currentTrackID: prevDoc.data().track.id,
          timeLastPlayed: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          paused: false,
          'totals.previouslyPlayed': totalPlayed + 1,
        }
      );

      batch.delete(sessionQueueRef.doc(current.id));

      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
