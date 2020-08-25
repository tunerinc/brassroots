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
import Spotify from 'rn-spotify-sdk/src/Spotify';
import addMusicItems from '../../../utils/addMusicItems';

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

    let shouldProgressUpdate = true;
    let oldTime = null;

    try {
      const unsubscribe = sessionRef.onSnapshot(
        async doc => {
          const {
            chat: { unsubscribe: chatUnsubscribe },
            entities: { sessions, tracks, users },
            player: { currentTrackID, progress },
            queue: { unsubscribe: queueUnsubscribe },
            sessions: { currentSessionID, infoUnsubscribe },
            users: { currentUserID },
          } = getState();

          const currentSession = sessions.byID[currentSessionID];

          if (currentSession) {
            const isListener = currentUserID !== currentSession.ownerID;
            const isSessionOwner = currentUserID === currentSession.ownerID;
            const { totalListeners } = currentSession;
            const track = tracks.byID[currentTrackID];
            const owner = users.byID[currentSession.ownerID];

            if (
              (isListener && (oldTime !== doc.data().timeLastPlayed)) ||
              (isListener && (doc.data().totals.listeners !== totalListeners)) ||
              (isSessionOwner)
            ) {
              if ((isListener)) {
                oldTime = doc.data().timeLastPlayed;
              }

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
                  if (owner && track) {
                    dispatch(leaveSession(
                      currentUserID,
                      {
                        chatUnsubscribe,
                        infoUnsubscribe,
                        queueUnsubscribe,
                        track,
                        id: currentSessionID,
                        total: currentSession.totalListeners,
                      },
                      {
                        id: owner.id,
                        name: owner.displayName,
                        image: owner.profileImage,
                      },
                    ));
                  }
                }

                session.live = false;
                sessionRef.update({ prevOwner: null, });
              }

              if (session.currentTrackID !== currentTrackID) {
                const trackRes = await Spotify.getTracks([doc.data().currentTrackID], {});
                const tracks = addMusicItems(trackRes.tracks);
              }
              
              dispatch(addEntities({ sessions: { [session.id]: session }, ...tracks }));
              dispatch(updatePlayer({ paused: doc.data().paused, }));
              dispatch(actions.success(unsubscribe));
            }
          } else {
            // alert("Unable to retrieve the session from Ultrasound")
          }
        },
        error => { throw error },
      );
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}