'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module LeaveSession
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
// import GeoFirestore from 'geofirestore';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {stopSessionInfoListener} from '../StopSessionInfoListener';
import {resetPlayer} from '../../player/ResetPlayer';
import {resetQueue} from '../../queue/ResetQueue';
import {stopQueueListener} from '../../queue/StopQueueListener';
import {addRecentTrack} from '../../tracks/AddRecentTrack';
import {type ThunkAction} from '../../../reducers/sessions';
import {type TrackArtist} from '../../../reducers/tracks';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDocs,
  type FirestoreDoc,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type Session = {
  +id: string,
  +track: {
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
  },
  +total: number,
  +chatUnsubscribe: () => void,
  +infoUnsubscribe: () => void,
  +queueUnsubscribe: () => void,
  +coords?: {
    +lat: number,
    +lon: number,
  },
};

type Owner = {
  +id: string,
  +name: string,
  +image: string,
};

/**
 * Stop the realtime listener on the chat
 * 
 * @callback chatUnsub
 */

/**
 * Stop the realtime listener on the info
 * 
 * @callback infoUnsub
 */

/**
 * Stop the realtime listener on the queue
 * 
 * @callback queueUnsub
 */

/**
 * Async function which leaves a session for the current user
 * 
 * @async
 * @function leaveSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}     userID                           The user id of the current user
 * @param    {object}     session                          The session object the current user is trying to leave
 * @param    {string}     session.id                       The id of the session the user is leaving
 * @param    {object}     session.track                    The currently playing song in the session the user is leaving
 * @param    {string}     session.track.id                 The Spotify id of the track
 * @param    {string}     session.track.name               The name of the track
 * @param    {number}     session.track.trackNumber        The track number of the track within the album
 * @param    {number}     session.track.durationMS         The duration of the track in milliseconds
 * @param    {object}     session.track.album              The album the track is apart of
 * @param    {string}     session.track.album.id           The Spotify id of the track's album
 * @param    {string}     session.track.album.name         The name of the track's album
 * @param    {string}     session.track.album.small        A small image of the track's album artwork
 * @param    {string}     session.track.album.medium       A medium image of the track's album artwork
 * @param    {string}     session.track.album.large        A large image of the track's album artwork
 * @param    {object[]}   session.track.album.artists      The artists on the album
 * @param    {string}     session.track.album.artists.id   The Spotify id of the album artist
 * @param    {string}     session.track.album.artists.name The name of the album artist
 * @param    {object[]}   session.track.artists            The artists on the track
 * @param    {string}     session.track.artists.id         The Spotify id of the track artist
 * @param    {string}     session.track.artists.name       The name of the track artist
 * @param    {number}     session.total                    The total number of listeners in the session
 * @param    {chatUnsub}  session.chatUnsubscribe          The function to invoke to unsubscribe from the chat listener
 * @param    {infoUnsub}  session.infoUnsubscribe          The function to invoke to unsubscribe from the info listener
 * @param    {queueUnsub} session.queueUnsubscribe         The function to invoke to unsubscribe from the queue listener
 * @param    {object}     [session.coords]                 The coordinates of the session the current user is leaving, if available
 * @param    {number}     session.coords.lat               The latitude value of the coordinates
 * @param    {number}     session.coords.lon               The longitude value of the coordinates
 * @param    {object}     owner                            The owner object of the dj of the session
 * @param    {string}     owner.id                         The user id of the owner
 * @param    {string}     owner.name                       The username of the owner
 * @param    {string}     owner.image                      The profile image of the owner
 *
 * @returns  {Promise}
 * @resolves {string}                                      The session id the current user has successfully left
 * @rejects  {Error}                                       The error which caused the leave session failure
 */
export function leaveSession(
  userID: string,
  session: Session,
  owner: Owner,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());
    dispatch(stopSessionInfoListener(session.infoUnsubscribe));
    // $FlowFixMe
    dispatch(stopQueueListener(session.queueUnsubscribe));

    const firestore: FirestoreInstance = getFirestore();
    const geoRef: FirestoreRef = firestore.collection('geo');
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const userRef: FirestoreDoc = firestore.collection('users').doc(userID);
    // const geoFirestore = new GeoFirestore(geoRef);

    let batch: FirestoreBatch = firestore.batch();

    try {
      const timeLeft: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

      await Spotify.setPlaying(false);

      dispatch(
        addEntities(
          {
            sessions: {
              [session.id]: {
                id: session.id,
                totalListeners: session.total - 1,
                listeners: [],
              },
            },
            users: {
              [userID]: {
                id: userID,
                currentSessionID: null,
              },
            },
          },
        ),
      );

      dispatch(actions.success(owner.id === userID));
      dispatch(resetPlayer());
      dispatch(resetQueue());

      if (owner.id === userID) {
        if (session.total === 1) {
          batch.update(sessionRef, {live: false, "totals.listeners": 0, paused: true});
        } else {
          const sessionUsers: FirestoreDocs = await sessionRef.collection('users').where('active', '==', true).get();
          const newOwnerDoc = sessionUsers.docs[Math.floor(Math.random()*sessionUsers.docs.length)];
  
          batch.update(
            sessionRef,
            {
              "totals.listeners": session.total - 1,
              "owner.id": newOwnerDoc.data().id,
              "owner.name": newOwnerDoc.data().displayName,
              "owner.image": newOwnerDoc.data().profileImage,
            }
          );
        }
      } else {
        batch.update(sessionRef, {'totals.listeners': session.total - 1});
      }

      batch.update(sessionRef.collection('users').doc(userID), {timeLeft, active: false, paused: true});
      batch.update(userRef, {currentSession: null, online: false});
      batch.update(userRef.collection('sessions').doc(session.id), {timeLeft});

      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
