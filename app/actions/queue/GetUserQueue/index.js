'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserQueue
 */

import Spotify from 'rn-spotify-sdk';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {removeQueueTrack} from '../RemoveQueueTrack';
import {addEntities} from '../../entities/AddEntities';
import {updatePlayer} from '../../player/UpdatePlayer';
import {
  type ThunkAction,
  type QueueTrack,
} from '../../../reducers/queue';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

/**
 * Async function which gets the now playing session's queue
 * 
 * @async
 * @function getUserQueue
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID    The user id of the current user
 * @param    {string}  sessionID The session id to get the queue from
 *
 * @return   {Promise}
 * @resolves {object}            The queue from the now playing session
 * @reject   {Error}             The error which caused the get session queue failure
 */
export function getUserQueue(
  userID: string,
  sessionID: string,
  current: ?string,
): ThunkAction {
  return async (dispatch, getState, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(sessionID);
    const queueRef: FirestoreDocs = sessionRef.collection('queue');

    try {
      const unsubscribe = queueRef.orderBy('timeAdded', 'desc')
        .onSnapshot(
          {includeMetadataChanges: true},
          snapshot => {
            snapshot.docChanges().forEach(change => {
              const queueTrack = change.doc.data();
              const user = queueTrack.user;
              const track = queueTrack.track;
              const album = track.album;
              const artists = [...track.artists, ...album.artists]
                .reduce((artistList, artist) => {
                  return updateObject(artistList, {
                    [artist.id]: {
                      id: artist.id,
                      name: artist.name,
                    },
                  });
                }, {});

              if (change.type === 'added') {
                if (user.id !== userID) {
                  dispatch(addEntities({users: {[user.id]: user}}));
                }

                dispatch(
                  addEntities(
                    {
                      artists,
                      tracks: {
                        [track.id]: {
                          id: track.id,
                          name: track.name,
                          albumID: album.id,
                          artists: track.artists,
                          trackNumber: track.trackNumber,
                          durationMS: track.durationMS,
                        },
                      },
                    },
                  ),
                );

                if (!change.doc.metadata.hasPendingWrites) {
                  dispatch(actions.success([], unsubscribe));
                  dispatch(
                    addEntities(
                      {
                        queueTracks: {
                          [queueTrack.id]: {
                            id: queueTrack.id,
                            trackID: track.id,
                            userID: user.id,
                            totalLikes: queueTrack.totalLikes,
                            liked: queueTrack.likes.includes(userID),
                            seconds: queueTrack.timeAdded.seconds,
                            nanoseconds: queueTrack.timeAdded.nanoseconds,
                            isCurrent: queueTrack.isCurrent,
                          },
                        },
                      },
                    ),
                  );

                  if (queueTrack.isCurrent) {
                    dispatch(removeQueueTrack(queueTrack.id));
                    dispatch(
                      updatePlayer(
                        {
                          currentTrackID: track.id,
                          currentQueueID: queueTrack.id,
                          durationMS: track.durationMS,
                        },
                      ),
                    );
                  } else {
                    dispatch(
                      actions.success(
                        [
                          {
                            id: queueTrack.id,
                            seconds: queueTrack.timeAdded.seconds,
                            nanoseconds: queueTrack.timeAdded.nanoseconds,
                          },
                        ],
                        unsubscribe,
                      ),
                    );
                  }
                }
              }

              if (change.type === 'modified') {
                dispatch(
                  addEntities(
                    {
                      queueTracks: {
                        [queueTrack.id]: {
                          id: queueTrack.id,
                          trackID: track.id,
                          userID: user.id,
                          totalLikes: queueTrack.totalLikes,
                          liked: queueTrack.likes.includes(userID),
                          seconds: queueTrack.timeAdded.seconds,
                          nanoseconds: queueTrack.timeAdded.nanoseconds,
                          isCurrent: queueTrack.isCurrent,
                        },
                      },
                    },
                  ),
                );

                if (queueTrack.isCurrent) {
                  dispatch(removeQueueTrack(queueTrack.id));
                  dispatch(
                    updatePlayer(
                      {
                        currentTrackID: track.id,
                        currentQueueID: queueTrack.id,
                        durationMS: track.durationMS,
                      },
                    ),
                  );
                } else {
                  dispatch(
                    actions.success(
                      [
                        {
                          id: queueTrack.id,
                          seconds: queueTrack.timeAdded.seconds,
                          nanoseconds: queueTrack.timeAdded.nanoseconds,
                        },
                      ],
                      unsubscribe,
                    ),
                  );
                }
              }

              if (change.type === 'removed') {
                dispatch(removeQueueTrack(queueTrack.id));
              }
            });
          },
          error => {throw error},
        );
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
