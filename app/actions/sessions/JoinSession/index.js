'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module JoinSession
 */

import moment from 'moment';
// import GeoFirestore from 'geofirestore';
import {Actions} from 'react-native-router-flux';
import {leaveSession} from '../LeaveSession';
import {updateSessions} from '../UpdateSessions';
import {updatePlayer} from '../../player/UpdatePlayer';
import {updateQueue} from '../../queue/UpdateQueue';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/sessions';
import {type TrackArtist} from '../../../reducers/tracks';
import {type Context} from '../../../reducers/queue';
import {type BRSession} from '../../../utils/brassrootsTypes';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreRef,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type Session = {
  +id: string,
  +currentTrackID?: string,
  +totalListeners?: number,
  +timeLastPlayed?: string,
  +progress?: number,
  +paused?: boolean,
  +context?: Context,
  +owner?: {
    +id: string,
    +name: string,
    +image: string,
  },
  +current?: string,
  +total?: number,
  +track?: {
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
  +coords?: {
    +lat: number,
    +lon: number,
  },
  +chatUnsubscribe: ?() => void,
  +infoUnsubscribe: ?() => void,
  +queueUnsubscribe: ?() => void,
};

type User = {|
  +id: string,
  +displayName: string,
  +profileImage: string,
|};

/**
 * Async function which joins a session for the current user
 * 
 * @async
 * @function joinSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {object}   session                          The session the current user is trying to join
 * @param    {string}   session.id                       The id of the session
 * @param    {object}   [session.owner]                  The user object of the owner of the session the user is leaving
 * @param    {string}   session.owner.id                 The Spotify id of the owner of the session
 * @param    {string}   session.owner.name               The name of the owner of the session
 * @param    {string}   session.owner.image              The image of the owner of the session
 * @param    {string}   [session.current]                The id of the current session if the user is leaving
 * @param    {number}   [session.total]                  The total amount of listeners in the session the user is leaving
 * @param    {object}   [session.track]                  The track object of the currently playing song in the session the user is leaving
 * @param    {string}   session.track.id                 The Spotify id of the track
 * @param    {string}   session.track.name               The name of the track
 * @param    {number}   session.track.trackNumber        The track number of the track within the album
 * @param    {number}   session.track.durationMS         The duration of the track in milliseconds
 * @param    {object}   session.track.album              The album the track is apart of
 * @param    {string}   session.track.album.id           The Spotify id of the track's album
 * @param    {string}   session.track.album.name         The name of the track's album
 * @param    {string}   session.track.album.small        A small image of the track's album artwork
 * @param    {string}   session.track.album.medium       A medium image of the track's album artwork
 * @param    {string}   session.track.album.large        A large image of the track's album artwork
 * @param    {object[]} session.track.album.artists      The artists on the album
 * @param    {string}   session.track.album.artists.id   The Spotify id of the album artist
 * @param    {string}   session.track.album.artists.name The name of the album artist
 * @param    {object[]} session.track.artists            The artists on the track
 * @param    {string}   session.track.artists.id         The Spotify id of the track artist
 * @param    {string}   session.track.artists.name       The name of the track artist
 * @param    {object}   [session.coords]                 The coordinates object of the session the user is leaving
 * @param    {number}   session.coords.lat               The latitude value of the coordinates
 * @param    {number}   session.coords.lon               The longitude value of the coordinates
 * @param    {object}   user                             The current user object
 * @param    {string}   user.id                          The id of the current user
 * @param    {string}   user.displayName                 The username of the current user
 * @param    {string}   user.profileImage                The profile image URL of the current user
 * @param    {boolean}  leaving                          Whether or not the current user is leaving a session to join a new one
 *
 * @returns  {Promise}
 * @resolves {string}                                    The session id the current user has successfully joined
 * @rejects  {Error}                                     The error which caused the join session failure
 */
export function joinSession(
  session: Session,
  user: User,
  leaving: boolean,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    if (leaving) {
      const {
        owner,
        coords,
        current,
        total,
        track,
        chatUnsubscribe,
        infoUnsubscribe,
        queueUnsubscribe,
      } = session;

      if (
        owner
        && current
        && typeof total === 'number'
        && track
        && chatUnsubscribe
        && infoUnsubscribe
        && queueUnsubscribe
      ) {
        const sessionToLeave = {
          coords,
          total,
          track,
          chatUnsubscribe,
          infoUnsubscribe,
          queueUnsubscribe,
          id: current,
        };

        dispatch(leaveSession(user.id, sessionToLeave, owner));
      }
    }

    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const userRef: FirestoreDoc = firestore.collection('users').doc(user.id);
    // const geoRef: FirestoreRef = firestore.collection('geo');
    // const geoFirestore = new GeoFirestore(geoRef);

    let batch: FirestoreBatch = firestore.batch();

    try {
      const newSession: Session = await firestore.runTransaction(async transaction => {
        const doc: FirestoreDoc = await transaction.get(sessionRef);

        if (!doc.exists) {
          throw new Error('Unable to retrieve the session from Ultrasound');
        }

        const {
          coords,
          context,
          currentTrackID,
          currentQueueID,
          timeLastPlayed,
          progress,
          paused,
          owner: newOwner,
          totals: {listeners, users, previouslyPlayed},
        } = doc.data();

        transaction.update(
          sessionRef,
          {'totals.listeners': listeners + 1, 'totals.users': users + 1},
        );

        return {
          coords,
          context,
          currentTrackID,
          currentQueueID,
          timeLastPlayed,
          progress,
          paused,
          totalListeners: listeners + 1,
          totalPlayed: previouslyPlayed,
          owner: newOwner,
        };
      });

      const timeJoined: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');
      const timeLastPlayed = newSession.timeLastPlayed
        ? newSession.timeLastPlayed
        : moment(timeJoined, 'ddd, MMM D, YYYY, h:mm:ss a').subtract(10, 'seconds');

      const diff = moment(timeJoined, 'ddd, MMM D, YYYY, h:mm:ss a').diff(timeLastPlayed, 'seconds');
      const progress = newSession.progress + (diff * 1000);

      if (newSession.context) dispatch(updateQueue({context: newSession.context}));

      dispatch(updatePlayer({progress}));
      dispatch(updateSessions({currentSessionID: session.id}));
      dispatch(actions.success());
      Actions.liveSession();

      batch.update(userRef, {live: true, currentSession: session.id});
      batch.set(userRef.collection('sessions').doc(session.id), {timeJoined, id: session.id});
      batch.set(
        sessionRef.collection('users').doc(user.id),
        {
          ...user,
          progress,
          timeJoined,
          active: true,
          muted: false,
          paused: newSession.paused,
        }
      );

      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}