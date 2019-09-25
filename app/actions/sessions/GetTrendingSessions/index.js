'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetTrendingSessions
 */

import Spotify from 'rn-spotify-sdk';
import Permissions from 'react-native-permissions';
import addMusicItems from '../../../utils/addMusicItems';
import getUserLocation from '../../../utils/getUserLocation';
import calculateDistance from '../../../utils/calculateDistance';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addEntities} from '../../entities/AddEntities';
import {updateSessions} from '../UpdateSessions';
import {
  type ThunkAction,
  type Session,
} from '../../../reducers/sessions';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDocs,
  type FirestoreDoc,
} from '../../../utils/firebaseTypes';
import {type Playlist} from '../../../reducers/playlists';
import {type User} from '../../../reducers/users';
import {type Album} from '../../../reducers/albums';
import {type Artist} from '../../../reducers/artists';
import {type Track} from '../../../reducers/tracks';

type Coords = {
  coords?: {
    latitude: number,
    longitude: number,
  },
};

/**
 * Async function which gets the current trending sessions from Ultrasound
 * 
 * @async
 * @function getTrendingSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  userID The Spotify id of the current user
 *
 * @returns  {Promise}
 * @resolves {object}         The session objects retrieved from Ultrasound
 * @rejects  {Error}          The error which caused the get trending sessions failure
 */
export function getTrendingSessions(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionsRef: FirestoreRef = firestore.collection('sessions');

    let playlists = {};
    let users = {};
    let pos: Coords = {coords: {}};

    try {
      const permission: string = await Permissions.request('location', { type: 'whenInUse' });

      if (permission === 'authorized') {
        pos = await getUserLocation();
      } else if (permission === 'undetermined') {
        await Permissions.request('location', {type: 'whenInUse'});
        pos = await getUserLocation();
      }

      if (pos.coords && Object.keys(pos.coords).length !== 0) {
        users = updateObject(users, {[userID]: {id: userID, coords: pos.coords}});
      }

      const trendingSessions: FirestoreDocs = await sessionsRef.where('live', '==', true)
        .orderBy('totals.listeners', 'desc')
        .limit(15)
        .get();

      if (trendingSessions.empty) {
        dispatch(updateSessions({explore: {trendingIDs: [], trendingCanPaginate: true}}));
        dispatch(actions.success());
      } else {
        const trendingIDs: Array<string> = trendingSessions.docs.map(doc => doc.data().id);
        const trendingCanPaginate: boolean = trendingIDs.length === 15;
        const tracksToFetch: Array<string> = trendingSessions.docs.map(doc => doc.data().currentTrackID);
        const trackRes = await Spotify.getTracks(tracksToFetch, {});
        const music = addMusicItems(trackRes.tracks);
        const sessions = trendingSessions.docs.reduce((obj, doc) => {
          const {
            coords,
            currentQueueID,
            currentTrackID,
            owner,
            id,
            totals: {listeners: totalListeners, previouslyPlayed: totalPlayed},
          } = doc.data();

          let distance: number = -1;

          if (coords && pos.coords) {
            distance = calculateDistance(
              coords.lat,
              coords.lon,
              pos.coords.latitude,
              pos.coords.longitude,
            );

            if (distance.toFixed(0) !== 0) {
              distance = parseInt(distance.toFixed(0));
            }
          }

          users = updateObject(users, {
            [owner.id]: {
              id: owner.id,
              displayName: owner.name,
              profileImage: owner.image,
              currentSessionID: id,
            },
          });
          
          return updateObject(obj, {
            [id]: {
              id,
              currentQueueID,
              currentTrackID,
              distance,
              totalListeners,
              totalPlayed,
              ownerID: owner.id,
            },
          });
        }, {});

        trendingSessions.docs.filter(doc => doc.data().context.type === 'user')
          .forEach(doc => {
            const {context: {id, name: displayName}} = doc.data();
            users = updateObject(users, {[id]: {id, displayName}});
          });

        trendingSessions.docs.filter(doc => doc.data().context.type === 'playlist')
          .forEach(doc => {
            const {context: {id, name}} = doc.data();
            playlists = updateObject(playlists, {[id]: {id, name, members: [], tracks: []}});
          });

        dispatch(addEntities({...music, playlists, sessions, users}));
        dispatch(updateSessions({explore: {trendingIDs, trendingCanPaginate}}));
        dispatch(actions.success());
      }
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}