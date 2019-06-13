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
import {addSessions} from '../AddSessions';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import {addPlaylists} from '../../playlists/AddPlaylists';
import {addCurrentLocation} from '../../users/AddCurrentLocation';
import {addPeople} from '../../users/AddPeople';
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
 * Async function which gets the current trending sessions from Ultrasound
 * 
 * @async
 * @function getTrendingSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns  {Promise}
 * @resolves {object}  The session objects retrieved from Ultrasound
 * @rejects  {Error}   The error which caused the get trending sessions failure
 */
export function getTrendingSessions(): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.getTrendingSessionsRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionsRef: FirestoreRef = firestore.collection('sessions');

    let playlists: Playlists = {};
    let users: Users = {};
    let pos: Coords = {coords: {}};

    try {
      const permission: string = await Permissions.request('location', { type: 'whenInUse' });

      if (permission === 'authorized') {
        pos = await getUserLocation();
      } else if (permission === 'undetermined') {
        await Permissions.request('location', { type: 'whenInUse' });
        pos = await getUserLocation();
      }

      if (pos.coords && Object.keys(pos.coords).length !== 0) {
        dispatch(addCurrentLocation(pos.coords));
      }

      const sessions: FirestoreDocs = await sessionsRef.where('live', '==', true)
        .orderBy('totals.listeners', 'desc')
        .limit(15)
        .get();

      if (sessions.empty) {
        dispatch(actions.getTrendingSessionsSuccess());
      } else {
        const sessionIDs: Array<string> = sessions.docs.map(doc => doc.data().id);
        const tracksToFetch: Array<string> = sessions.docs.map(doc => doc.data().currentTrackID);
        const trackRes = await Spotify.getTracks(tracksToFetch, {});
        const music: Music = addMusicItems(trackRes.tracks);

        const trendingSessions: Sessions = sessions.docs.reduce((obj, doc) => {
          const {
            coords,
            currentQueueID,
            currentTrackID,
            owner,
            id,
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
              username: owner.name,
              profileImage: owner.image
            },
          });
          
          return updateObject(obj, {
            [id]: {
              id,
              currentQueueID,
              currentTrackID,
              distance,
              totalListeners,
              ownerID: owner.id,
            },
          });
        });

        sessions.docs.filter(doc => doc.data().context.type === 'user')
          .forEach(doc => {
            const {context: {id, name: username}} = doc.data();
            users = updateObject(users, {[id]: {id, username}});
          });

        sessions.docs.filter(doc => doc.data().context.type === 'playlist')
          .forEach(doc => {
            const {context: {id, name}} = doc.data();
            playlists = updateObject(playlists, {[id]: {id, name, members: [], tracks: []}});
          });

        if (Object.keys(playlists).length !== 0) {
          dispatch(addPlaylists(playlists));
        }

        dispatch(addArtists(music.artists));
        dispatch(addAlbums(music.albums));
        dispatch(addTracks(music.tracks));
        dispatch(addPeople(users));
        dispatch(addSessions(trendingSessions))
        dispatch(actions.getTrendingSessionsSuccess(sessionIDs, sessionIDs.length === 15));
      }
    } catch (err) {
      dispatch(actions.getTrendingSessionsFailure(err));
    }
  };
}