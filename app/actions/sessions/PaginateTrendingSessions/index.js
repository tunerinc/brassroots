'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PaginateTrendingSessions
 */

import Spotify from 'rn-spotify-sdk';
import Permissions from 'react-native-permissions';
import addMusicItems from '../../../utils/addMusicItems';
import calculateDistance from '../../../utils/calculateDistance';
import updateObject from '../../../utils/updateObject';
import getUserLocation from '../../../utils/getUserLocation';
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

type Sessions = {+[id: string]: Session};
type Playlists = {+[id: string]: Playlist};
type Users = {+[id: string]: User};

type Coords = {
  coords?: {
    latitude: number,
    longitude: number,
  },
};

type Music = {|
  +tracks: {+[id: string]: Track},
  +albums: {+[id: string]: Album},
  +artists: {+[id: string]: Artist},
|};

/**
 * Async function that paginates trending sessions from Ultrasound
 * 
 * @async
 * @function paginateTrendingSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param    {string}  userID The Spotify id of the current user
 * @param    {number}  cursor The total number of listeners in the last session retrieved
 * 
 * @return   {Promise}
 * @resolves {array}          The paginated sessions from Ultrasound
 * @rejects  {Error}          The error which caused the paginate trending sessions failure
 */
export function paginateTrendingSessions(
  userID: string,
  cursor: number,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionsRef: FirestoreRef = firestore.collection('sessions');

    let playlists: Playlists = {};
    let users: Users = {};
    let pos: Coords = {coords: {}};

    try {
      const permission: string = await Permissions.request('location', {type: 'whenInUse'});

      if (permission === 'authorized') {
        pos = await getUserLocation();
      } else if (permission === 'undetermined') {
        await Permissions.request('location', { type: 'whenInUse' });
        pos = await getUserLocation();
      }

      if (pos.coords && Object.keys(pos.coords).length !== 0) {
        users = updateObject(users, {[userID]: {id: userID, coords: pos.coords}});
      }

      const trendingSessions: FirestoreDocs = await sessionsRef.where('live', '==', true)
        .orderBy('totals.listeners', 'desc')
        .startAfter(cursor)
        .limit(15)
        .get();

      if (trendingSessions.empty) {
        dispatch(updateSessions({explore: {trendingCanPaginate: false}}));
        dispatch(actions.success());
      } else {
        const trendingIDs: Array<string> = trendingSessions.docs.map(doc => doc.data().id);
        const trendingCanPaginate: boolean = trendingIDs.length === 15;
        const tracksToFetch: Array<string> = trendingSessions.docs.map(doc => doc.data().currentTrackID);
        const trackRes = await Spotify.getTracks(tracksToFetch, {});
        const music: Music = addMusicItems(trackRes.tracks);
        const sessions: Sessions = trendingSessions.docs.reduce((obj, doc) => {
          const {
            coords,
            currentTrackID,
            currentQueueID,
            owner,
            id,
            mode,
            totals: {listeners: totalListeners},
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
              currentTrackID,
              currentQueueID,
              distance,
              mode,
              totalListeners,
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