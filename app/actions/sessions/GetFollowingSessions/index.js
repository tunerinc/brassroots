'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module GetFollowingSessions
 */

import Spotify from 'rn-spotify-sdk';
import Permissions from 'react-native-permissions';
import addMusicItems from '../../../utils/addMusicItems';
import getUserLocation from '../../../utils/getUserLocation';
import calculateDistance from '../../../utils/calculateDistance';
import updateObject from '../../../utils/updateObject';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import {addPlaylists} from '../../playlists/AddPlaylists';
import {addCurrentLocation} from '../../users/AddCurrentLocation';
import {addPeople} from '../../users/AddPeople';
import {addSessions} from '../AddSessions';
import * as actions from './actions';
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

type Sessions = {
  +[id: string]: Session,
};

type Playlists = {
  +[id: string]: Playlist,
};

type Users = {
  +[id: string]: User,
};

type Coords = {
  coords?: {
    latitude: number,
    longitude: number,
  },
};

type Music = {
  tracks: {
    +[id: string]: Track,
  },
  albums: {
    +[id: string]: Album,
  },
  artists: {
    +[id: string]: Artist,
  },
};

/**
 * Async function which gets the current sessions from Ultrasound
 * 
 * @async
 * @function getFollowingSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {string}  userID    The user id of the current user
 *
 * @returns  {Promise}
 * @resolves {object}            The session objects retrieved from Ultrasound
 * @rejects  {Error}             The error which caused the get following sessions failure
 */
export function getFollowingSessions(
  userID: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.getFollowingSessionsRequest());

    const firestore: FirestoreInstance = getFirestore();
    const sessionsRef: FirestoreRef = firestore.collection('sessions');
    const userFollowingRef: FirestoreDocs = firestore.collection('users').doc(userID).collection('following');

    let playlists: Playlists = {};
    let pos: Coords = {};
    let users: Users = {};

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

      const liveUsers: FirestoreDocs = await userFollowingRef
        .where('live', '==', true)
        .orderBy('currentSessionID')
        .limit(15)
        .get();

      if (liveUsers.empty) {
        dispatch(actions.getFollowingSessionsSuccess());
      } else {
        const sessions: Array<FirestoreDoc> = await Promise.all(
          liveUsers.docs.map(liveUser => sessionsRef.doc(liveUser.data().currentSessionID).get())
        );
        const sessionIDs: Array<string> = sessions.map(session => session.data().id);
        const tracksToFetch: Array<string> = sessions.map(session => session.data().currentTrackID);
        const trackRes = await Spotify.getTracks(tracksToFetch, {});
        const music: Music = addMusicItems(trackRes.tracks);

        const followingSessions: Sessions = sessions.reduce((obj, session, index) => {
          const followingUser = liveUsers.docs[index].data();
          const {
            coords,
            currentQueueID,
            currentTrackID,
            owner,
            id,
            totals: {listeners: totalListeners},
          } = session.data();

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
            },
            ...(owner.id === followingUser.id
              ? {}
              : {
                [followingUser.id]: {
                  id: followingUser.id,
                  displayName: followingUser.displayName,
                  profileImage: followingUser.profileImage,
                },
              }
            )
          });
  
          return updateObject(obj, {
            [id]: {
              id,
              currentQueueID,
              currentTrackID,
              distance,
              totalListeners,
              followingID: followingUser.id,
              ownerID: owner.id,
            },
          });
        }, {});
  
        sessions.filter(session => session.data().context.type === 'user')
          .forEach(session => {
            const {context: {id, name: username}} = session.data();
            users = updateObject(users, {[id]: {id, username}});
          });
  
        sessions.filter(session => session.data().context.type === 'playlist')
          .forEach(session => {
            const {context: {id, name}} = session.data();
            playlists = updateObject(playlists, {[id]: {id, name, members: [], tracks: []}});
          });
  
        if (Object.keys(playlists).length > 0) {
          dispatch(addPlaylists(playlists));
        }
  
        dispatch(addArtists(music.artists));
        dispatch(addAlbums(music.albums));
        dispatch(addTracks(music.tracks));
        dispatch(addPeople(users));
        dispatch(addSessions(followingSessions));
        dispatch(actions.getFollowingSessionsSuccess(sessionIDs, sessionIDs.length === 15));
      }
    } catch (err) {
      dispatch(actions.getFollowingSessionsFailure(err));
    }
  };
}