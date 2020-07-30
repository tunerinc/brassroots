'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdatePlayer
 */

import * as types from '../types';
import {
  type Action,
  type Updates,
} from '../../../reducers/player';
import { type ThunkAction } from '../../../reducers/player';
import { firestore } from 'firebase';
import moment from 'moment-timezone';
moment.tz.setDefault("America/Chicago");
import { update } from 'lodash';
import * as actions from './actions';
import {
  type FirestoreInstance,
  type FirestoreDoc,
  type FirestoreRef,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';
import { getFirestore } from 'redux-firestore';

// const envConfig = require('../../../../env.json');
// const Firestore = require('@google-cloud/firestore');

// const firestore = new Firestore({
//   projectId: envConfig.FIREBASE_PROJECT_ID,
//   keyFilename: '../../../../Downloads/brassroots-eae79e34a66d.json',
// });

// firestore.settings({timestampsInSnapshots: true});

/**
 * Update the player with any new information
 * 
 * @function updatePlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  updates                    The updates to make to the player
 * @param   {boolean} [updates.attemptingToPlay] The new status of whether the current user is attempting to play a track
 * @param   {string}  [updates.prevTrackID]      The Spotify id of the new previous track
 * @param   {string}  [updates.prevQueueID]      The queue id of the new previous track
 * @param   {string}  [updates.currentTrackID]   The Spotify id of the new current track
 * @param   {string}  [updates.currentQueueID]   The queue id of the new current track
 * @param   {string}  [updates.nextTrackID]      The Spotify id of the new next track
 * @param   {string}  [updates.nextQueueID]      The queue id of the new next track
 * @param   {number}  [updates.durationMS]       The duration of the current track in milliseconds
 * @param   {number}  [updates.progress]         The progress of the current track in milliseconds
 * @param   {boolean} [updates.paused]           Whether the player is paused
 * 
 * @returns {object}                             Redux action with the type of UPDATE_PLAYER and the updates to make to the player
 */
export function updatePlayer(
  updates: Updates,
  sessionID?: string,
  userID?: string,
  pausing?: Boolean,
): Action {
  if (pausing) {
    return async () => {
      const firestore: FirestoreInstance = getFirestore();
      const sessionRef = firestore.collection('sessions').doc(sessionID);
      const sessionUserRef = sessionRef.collection('users').doc(userID);

      let batch = firestore.batch();

      batch.update(sessionUserRef, { paused: false, });
      batch.update(
        sessionRef,
        {
          timeLastPlayed: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          paused: false,
        },
      );

      await batch.commit();
    }
  }

  return {
    type: types.UPDATE_PLAYER,
    updates,
  };
}