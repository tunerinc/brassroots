'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetUserQueue
 */

import Spotify from 'rn-spotify-sdk';
import * as actions from './actions';
import {addArtists} from '../../artists/AddArtists';
import {addAlbums} from '../../albums/AddAlbums';
import {addTracks} from '../../tracks/AddTracks';
import {addPeople} from '../../users/AddPeople';
import {addQueueTracks} from '../AddQueueTracks';
import {type ThunkAction} from '../../../reducers/queue';
import {type FirestoreInstance} from '../../../utils/firebaseTypes';

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
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.getUserQueueRequest());

    const firestore: FirestoreInstance = getFirestore();

    try {
      console.log('get queue');
    } catch (err) {
      dispatch(actions.getUserQueueFailure(err));
    }
  };
}
