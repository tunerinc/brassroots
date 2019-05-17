'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module NextTrack
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
import {GeoFirestore} from 'geofirestore';
// import {addRecentTrack} from '../../tracks/AddRecentTrack';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import type {Action, State} from '../../../reducers/player';
import type {
  Firebase,
  FirestoreInstance,
  FirestoreRef,
  FirestoreDoc,
  FirestoreBatch,
} from '../../../utils/firebaseTypes';

type User = {
  id: string,
  username: string,
  profileImage: string,
};

type Session = {
  id: string,
  totalQueue: number,
  totalPlayed: number,
  totalUsers: number,
  coords?: {
    lat: number,
    lon: number,
  },
  current: {
    id: string,
    totalLikes: number,
    userID: string,
    prevTrackID: string,
    track: {
      id: string,
      name: string,
      durationMS: number,
      userID: string,
      album: {
        id: string,
        name: string,
        small: string,
        medium: string,
        large: string,
      },
      artists: Array<
        {
          id: string,
          name: string,
        }
      >,
    },
  }
};

type NextTrack = {
  id?: string,
  totalLikes?: number,
  userID?: string,
  prevTrackID?: string,
  nextQueueID?: string,
  nextTrackID?: string,
  position: number,
  track: {
    id: string,
    durationMS: number,
    name?: string,
    album?: {
      id: string,
      name: string,
      small: string,
      medium: string,
      large: string,
    },
    artists?: Array<
      {
        id: string,
        name: string,
      }
    >,
  },
};

type GetState = () => State;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState, firebase: Firebase) => any;
type Dispatch = (action: Action | PromiseAction | ThunkAction | Array<Action>) => any;

/**
 * Async function which plays the next track in the queue
 * 
 * @async
 * @function nextTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {object}   user
 * @param    {string}   user.id                              The user id of the current user
 * @param    {string}   user.username                        The username of the current user
 * @param    {string}   user.profileImage                    The profile image of the current user
 * @param    {string}   session                              The session object to play the next track in
 * @param    {string}   session.id                           The id of the session to play the next track in
 * @param    {number}   session.totalQueue                   The tracks which are next to play in the session
 * @param    {number}   session.totalPlayed                  The total amount of played tracks in the session
 * @param    {number}   session.totalUsers                   The total amount of listeners in the session
 * @param    {object}   [session.coords]                     The coordinates of the session the current user is in
 * @param    {number}   session.coords.lat                   The latitude of the gps coordinates
 * @param    {number}   session.coords.lon                   The longitude of the gps coordinates
 * @param    {object}   session.current                      The track that is currently playing in the session
 * @param    {string}   session.current.id                   The queue id of the currently playing track
 * @param    {number}   session.current.totalLikes           The total amount of likes the current track has
 * @param    {string}   session.current.userID               The id of the user who queued the track
 * @param    {string}   session.current.prevTrackID          The id of the previously played track from the current track
 * @param    {object}   session.current.track                The currently playing track's Spotify information
 * @param    {string}   session.current.track.id             The Spotify track id of the current track
 * @param    {string}   session.current.track.name           The name of the track
 * @param    {number}   session.current.track.durationMS     The duration of the track in milliseconds
 * @param    {object}   session.current.track.album          The album the track is in
 * @param    {string}   session.current.track.album.id       The Spotify id of the album
 * @param    {string}   session.current.track.album.name     The name of the album
 * @param    {string}   [session.current.track.album.small]  64x64 size of the album artwork
 * @param    {string}   [session.current.track.album.medium] 300x300 size of the album artwork
 * @param    {string}   [session.current.track.album.large]  640x640 size of the album artwork
 * @param    {object[]} session.current.track.artists        The track artists
 * @param    {string}   session.current.track.artists[].id   The Spotify id of the track artist
 * @param    {string}   session.current.track.artists[].name The name of the track artist
 * @param    {object}   nextTrack                            The next track to play in the session
 * @param    {string}   [nextTrack.id]                       The queue id of the next track if from queue. if null, then from context queue
 * @param    {number}   [nextTrack.totalLikes]               The total amount of likes the current track has if from queue
 * @param    {string}   [nextTrack.userID]                   The id of the user who queued the track if from queue
 * @param    {string}   [nextTrack.prevTrackID]              The queue id of the previous track if from queue
 * @param    {string}   [nextTrack.nextQueueID]              The queue id of the next track if from queue
 * @param    {string}   [nextTrack.nextTrackID]              The Spotify id of the next track if from queue
 * @param    {number}   nextTrack.position                   The position in the session's queue context, needed only if from context queue
 * @param    {object}   nextTrack.track                      The next track's Spotify information
 * @param    {string}   nextTrack.track.id                   The Spotify track id of the next track
 * @param    {number}   nextTrack.track.durationMS           The duration of the track in milliseconds
 * @param    {string}   [nextTrack.track.name]               The name of the track, needed only if from context queue
 * @param    {object}   [nextTrack.track.album]              The album the track is in, needed only if from context queue
 * @param    {string}   [nextTrack.track.album.id]           The Spotify id of the album, needed only if from context queue
 * @param    {string}   [nextTrack.track.album.name]         The name of the album, needed only if from context queue
 * @param    {string}   [nextTrack.track.album.small]        64x64 size of the album artwork, needed only if from context queue
 * @param    {string}   [nextTrack.track.album.medium]       300x300 size of the album artwork, needed only if from context queue
 * @param    {string}   [nextTrack.track.album.large]        640x640 size of the album artwork, needed only if from context queue
 * @param    {object[]} [nextTrack.track.artists]            The track artists, needed only if from context queue
 * @param    {string}   [nextTrack.track.artists.id]         The Spotify id of the track artist, needed only if from context queue
 * @param    {string}   [nextTrack.track.artists.name]       The name of the track artist, needed only if from context queue
 *
 * @returns  {Promise}
 * @resolves {object}                                        The now playing session with the next track now playing
 * @reject   {Error}                                         The error which caused the next track failure
 */
export function nextTrack(
  user: User,
  session: Session,
  nextTrack: NextTrack,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.nextTrackRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const sessionPrevRef: FirestoreDoc = sessionRef.collection('previouslyPlayed');
    const sessionQueueRef: FirestoreDoc = sessionRef.collection('queue');
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(user.id);
    const geoRef: FirestoreRef = firestore.collection('geo');
    const geoFirestore = new GeoFirestore(geoRef);
    const {totalQueue, totalPlayed, totalUsers, current, coords} = session;

    let batch: FirestoreBatch = firestore.batch();

    try {
      // dispatch(
      //   addRecentTrack(user.id, {...current.track, id: current.id, trackID: current.track.id})
      // );

      batch.update(sessionUserRef, {progress: 0, paused: false});
      batch.delete(sessionQueueRef.doc(current.id));
      batch.set(
        sessionPrevRef.doc(current.id),
        {
          id: current.id,
          trackID: current.track.id,
          userID: current.track.userID,
          totalLikes: current.totalLikes,
          prevTrackID: current.prevTrackID,
          nextTrackID: nextTrack.id,
        },
      );

      if (!nextTrack.id) {
        const queueDoc = sessionQueueRef.doc();
        const queueID = queueDoc.id;
        nextTrack = updateObject(nextTrack, {id: queueID});

        batch.set(
          sessionQueueRef.doc(queueID),
          {
            user,
            id: nextTrack.id,
            added: true,
            prevTrackID: current.id,
            nextTrackID: null,
            totalLikes: 0,
            likes: [],
            track: nextTrack.track,
          },
        );
      };

      batch.update(
        sessionRef,
        {
          progress: 0,
          currentQueueID: nextTrack.id,
          currentTrackID: nextTrack.track.id,
          timeLastPlayed: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          paused: false,
          'totals.previouslyPlayed': totalPlayed + 1,
          ...(nextTrack.prevTrackID
            ? {'totals.queue': totalQueue - 1}
            : {'context.position': nextTrack.position + 1}
          ),
        },
      );

      const promises = [
        batch.commit(),
        Spotify.playURI(`spotify:track:${nextTrack.track.id}`, 0, 0),
        ...(coords
          ? [geoFirestore.set(
            session.id,
            {
              id: session.id,
              currentQueueID: nextTrack.id,
              currentTrackID: nextTrack.track.id,
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
        actions.nextTrackSuccess(
          nextTrack.id,
          nextTrack.track.id,
          nextTrack.track.durationMS,
          nextTrack.nextQueueID,
          nextTrack.nextTrackID,
        ),
      );
    } catch (err) {
      dispatch(actions.nextTrackFailure(err));
    }
  };
}
