'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module JoinSession
 */

import moment from 'moment';
import GeoFirestore from 'geofirestore';
import {Actions} from 'react-native-router-flux';
import {leaveSession} from '../LeaveSession';
import * as actions from './actions';
import {type ThunkAction} from '../../../reducers/sessions';
import {type TrackArtist} from '../../../reducers/tracks';
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
 * @param    {object}  session             The session the current user is trying to join
 * @param    {string}  session.id          The id of the session
 * @param    {object}  [session.owner]     The user object of the owner of the session the user is leaving
 * @param    {string}  session.owner.id
 * @param    {string}  session.owner.name
 * @param    {string}  session.owner.image The 
 * @param    {string}  [session.current]   The id of the current session if the user is leaving
 * @param    {number}  [session.total]     The total amount of listeners in the session the user is leaving
 * @param    {string}  [session.track]     The track id of the currently playing song in the session the user is leaving   
 * @param    {object}  [session.coords]    The coordinates object of the session the user is leaving
 * @param    {number}  session.coords.lat 
 * @param    {number}  session.coords.lon
 * @param    {object}  user                The current user object
 * @param    {string}  user.id             The id of the current user
 * @param    {string}  user.displayName    The username of the current user
 * @param    {string}  user.profileImage   The profile image URL of the current user
 * @param    {boolean} leaving             Whether or not the current user is leaving a session to join a new one
 *
 * @returns  {Promise}
 * @resolves {string}                      The session id the current user has successfully joined
 * @rejects  {Error}                       The error which caused the join session failure
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
        && total
        && track
        && chatUnsubscribe
        && infoUnsubscribe
        && queueUnsubscribe
      ) {
        const sessionToLeave = {
          coords,
          total,
          owner,
          track,
          chatUnsubscribe,
          infoUnsubscribe,
          queueUnsubscribe,
          id: current,
        };

        dispatch(
          leaveSession(
            user.id,
            sessionToLeave,
            owner,
          )
        );
      }
    }

    dispatch(actions.joinSessionRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const userRef: FirestoreDoc = firestore.collection('users').doc(user.id);
    const geoRef: FirestoreRef = firestore.collection('geo');
    const geoFirestore = new GeoFirestore(geoRef);

    let batch: FirestoreBatch = firestore.batch();

    try {
      const newSession: Session = await firestore.runTransaction(async transaction => {
        const doc: FirestoreDoc = await transaction.get(sessionRef);

        if (!doc.exists) {
          throw new Error('Unable to retrieve the session from Ultrasound');
        }

        const {
          coords,
          currentTrackID,
          currentQueueID,
          owner: newOwner,
          totals: {listeners, users},
        } = doc.data();

        transaction.update(
          sessionRef,
          {'totals.listeners': listeners + 1, 'totals.users': users + 1},
        );

        return {
          coords,
          currentTrackID,
          currentQueueID,
          totalListeners: listeners + 1,
          owner: newOwner,
        };
      });

      const timeJoined: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');

      batch.update(userRef, {live: true, currentSessionID: session.id});
      batch.set(userRef.collection('sessions').doc(session.id), {timeJoined, id: session.id});
      batch.set(
        sessionRef.collection('users').doc(user.id),
        {
          ...user,
          timeJoined,
          active: true,
          progress: 0,
          muted: false,
          paused: false,
        }
      );

      const promises = [
        batch.commit(),
        ...(newSession.coords
          ? [geoFirestore.set(
            session.id,
            {
              id: session.id,
              coordinates: new firestore.GeoPoint(newSession.coords.lat, newSession.coords.lon),
              currentlyPlaying: newSession.currentTrackID,
              totalListeners: newSession.totalListeners,
              type: 'session',
              owner: newSession.owner,
            }
          )]
          : []
        ),
      ];

      await Promise.all(promises);
      dispatch(actions.joinSessionSuccess(session.id, user.id, parseInt(newSession.totalListeners)));

      Actions.liveSession();
    } catch (err) {
      dispatch(actions.joinSessionFailure(err));
    }
  };
}