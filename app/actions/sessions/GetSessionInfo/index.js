'use strict';

/**
 * @format
 * @flows
 */

/**
 * @module GetSessionInfo
 */

import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import { addEntities } from '../../entities/AddEntities';
import { updatePlayer } from '../../player/UpdatePlayer';
import { type ThunkAction } from '../../../reducers/sessions';
import {
  type FirestoreInstance,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';
import store from '../../../store/configureStore';
import { leaveSession } from '../LeaveSession';
import { getTrendingSessions } from '../GetTrendingSessions';
import { updateSessions } from '../UpdateSessions';
import { initialState } from '../../../reducers/player';
import { initialState as sessionInitialState } from '../../../reducers/sessions';
import { initialState as entityInitialState } from '../../../reducers/entities';

/**
 * Async function that gets the info for a session from Ultrasound
 * 
 * @async
 * @function getSessionInfo
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  sessionID The session id to retrieve the info for from Ultrasound
 * 
 * @return   {Promise}
 * @resolves {object}            The session info retrieved from Ultrasound when a change occurs
 * @rejects  {Error}             The error which caused the get session info failure
 */
export function getSessionInfo(
  sessionID: string,
): ThunkAction {
  return async (dispatch, getState, { getFirestore }) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    // const sessionsRef: FirestoreDoc = firestore.collection('sessions');

    try {
      const unsubscribe = sessionRef.onSnapshot(
        doc => {
          const {
            chat: { unsubscribe: chatUnsubscribe },
            entities: { sessions, tracks, users },
            player: { currentTrackID },
            queue: { unsubscribe: queueUnsubscribe },
            sessions: { currentSessionID, infoUnsubscribe },
            users: { currentUserID },
          } = getState();

          const session = {
            id: doc.data().id,
            currentTrackID: doc.data().currentTrackID,
            currentQueueID: doc.data().currentQueueID,
            progress: doc.data().progress,
            paused: doc.data().paused,
            live: doc.data().live,
            timeLastPlayed: doc.data().timeLastPlayed,
            ownerID: doc.data().owner.id,
            mode: doc.data().mode,
            distance: 0,
            totalListeners: doc.data().totals.listeners,
            totalPlayed: doc.data().totals.previouslyPlayed,
            prevOwner: doc.data().prevOwner,
          };

          if (doc.data().live == false || session.prevOwner === currentUserID) {
            if (currentSessionID) {
              const track = tracks.byID[currentTrackID];
              const owner = users.byID[sessions.byID[currentSessionID].ownerID];
              if (owner && track) {
                dispatch(leaveSession(
                  currentUserID,
                  {
                    chatUnsubscribe,
                    infoUnsubscribe,
                    queueUnsubscribe,
                    track,
                    id: currentSessionID,
                    total: sessions.byID[currentSessionID].totalListeners,
                  },
                  {
                    id: owner.id,
                    name: owner.displayName,
                    image: owner.profileImage,
                  },
                ));
              }
            }
            dispatch(getTrendingSessions(currentUserID));
          }

          if (session.prevOwner === currentUserID) {
            session.live = false;
            sessionRef.update({prevOwner:null,});
            // dispatch(updatePlayer(initialState));
            // dispatch(updateSessions(sessionInitialState));
            // dispatch(addEntities(entityInitialState));
          }

          // if (session.prevOwner === currentUserID) {
          //   session.live = false;
          //   dispatch(updateSessions({ currentSessionID: null, live: false }));
          //   sessionRef.update({prevOwner:null,});
          //   // unsubscribe();
          //   // alert("dispatch")
          //   // dispatch(updateSessions({ currentSessionID: "eeee", }));
          // }

          dispatch(addEntities({ sessions: { [session.id]: session } }));
          dispatch(updatePlayer({ paused: doc.data().paused, }));
          dispatch(actions.success(unsubscribe));
        },
        error => { throw error },
      );
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}