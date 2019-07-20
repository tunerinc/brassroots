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
import {addArtists} from '../../artists/AddArtists';
import {addAlbums} from '../../albums/AddAlbums';
import {addTracks} from '../../tracks/AddTracks';
import {addPeople} from '../../users/AddPeople';
import {addQueueTracks} from '../AddQueueTracks';
import {removeQueueTrack} from '../RemoveQueueTrack';
import {updatePlayer} from '../../player/UpdatePlayer';
import {type ThunkAction} from '../../../reducers/queue';
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
    dispatch(actions.getUserQueueRequest());

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
              const user = change.doc.data().user;
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
                  dispatch(addPeople({[user.id]: user}));
                  dispatch(addArtists(artists));
                  dispatch(addAlbums({[album.id]: album}));
                  dispatch(
                    addTracks(
                      {
                        [track.id]: {
                          id: track.id,
                          name: track.name,
                          albumID: album.id,
                          artists: track.artists,
                          trackNumber: track.trackNumber,
                          durationMS: track.durationMS,
                        },
                      },
                    ),
                  );
                }

                if (!change.doc.metadata.hasPendingWrites) {
                  dispatch(
                    addQueueTracks(
                      {
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
                    ),
                  );

                  if (queueTrack.isCurrent) {
                    dispatch(removeQueueTrack(queueTrack.id));
                  } else {
                    dispatch(actions.getUserQueueSuccess([queueTrack.id], unsubscribe));
                  }
                }
              }

              if (change.type === 'modified') {
                dispatch(
                  addQueueTracks(
                    {
                      [queueTrack.id]: {
                        id: queueTrack.id,
                        trackID: queueTrack.track.id,
                        userID: queueTrack.user.id,
                        totalLikes: queueTrack.totalLikes,
                        liked: queueTrack.likes.includes(userID),
                        seconds: queueTrack.timeAdded.seconds,
                        nanoseconds: queueTrack.timeAdded.nanoseconds,
                        isCurrent: queueTrack.isCurrent,
                      },
                    },
                  ),
                );

                if (queueTrack.isCurrent) {
                  dispatch(removeQueueTrack(queueTrack.id));
                } else {
                  dispatch(actions.getUserQueueSuccess([queueTrack.id], unsubscribe));
                }
              }

              if (change.type === 'removed') {
                dispatch(removeQueueTrack(queueTrack.id, true));
              }
            });
          },
          error => {throw error},
        );
    } catch (err) {
      dispatch(actions.getUserQueueFailure(err));
    }
  };
}
