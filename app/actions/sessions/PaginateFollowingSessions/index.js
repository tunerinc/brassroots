'use strict';

/**
 * @module PaginateFollowingSessions
 */

import Spotify from 'rn-spotify-sdk';
import addMusicItems from '../../../utils/addMusicItems';
import calculateDistance from '../../../utils/calculateDistance';
import updateObject from '../../../utils/updateObject';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import {addPlaylists} from '../../playlists/AddPlaylists';
import {addPeople} from '../../users/AddPeople';
import {addSessions} from '../AddSessions';
import * as actions from './actions';

/**
 * Async function that paginates the following sessions for the current user
 * 
 * @async
 * @function paginateFollowingSessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return   {Promise}
 * @resolves {array}   The paginated following sessions for the current user
 * @rejects  {Error}   The error which caused the paginate following sessions failure
 */
export function paginateFollowingSessions() {
  return async (dispatch, _, {getFirebase, getFirestore}) => {
    dispatch(actions.paginateFollowingSessionsRequest());

    const firebase = getFirebase();
    const {users: {coords: userCoords}} = state;

    let followingToFetch = [];
    let playlists = {};
    let users = {};
    let dbUsers = {};
    let sessions = [];

    let {
      sessions: {liveSessionsByID, followingSessions},
      users: {following},
    } = state;
    let currentFollowing = followingSessions.map(id => liveSessionsByID[id].ownerID);

    try {
      const liveUsers = await firebase.database().ref('users/live').once('value');

      if (liveUsers) {
        if (liveUsers.val()) {
          dbUsers = liveUsers.val();
        }
      } else {
        throw new Error('Unable to retrieve live users from Ultrasound');
      }

      if (Object.keys(dbUsers).length === 0 || following.length === 0) {
        dispatch(actions.paginateFollowingSessionsSuccess([]));
      } else {
        followingToFetch = following.filter(id => {
          return Object.keys(liveUsers).indexOf(id) !== -1 && currentFollowing.indexOf(id) === -1;
        })
          .slice(0, 15);
        
        for (let followingID of followingToFetch) {
          const fbUserRef = firebase.database().ref(`sessions/live/${dbUsers[followingID].sessionID}/info`);
          const sessionInfo = await fbUserRef.once('value');

          if (sessionInfo && sessionInfo.val()) {
            sessions = sessions.concat(sessionInfo.val());
          } else {
            throw new Error('Unable to retrieve live session from Ultrasound');
          }
        }

        const sessionIDs = sessions.map(session => session.id);
        const tracksToFetch = sessions.map(session => session.currentTrackID);
        const trackRes = await Spotify.getTracks(tracksToFetch, {});
        const music = addMusicItems(trackRes.tracks);

        const followingSessions = sessions.reduce((obj, session) => {
          const {
            coords,
            currentTrackID,
            currentQueueID,
            owner,
            id,
            mode,
            totals: {listeners: totalListeners},
          } = session;

          let distance = -1;

          if (coords && userCoords) {
            distance = calculateDistance(
              coords.lat,
              coords.lon,
              userCoords.lat,
              userCoords.lon,
            );

            if (distance.toFixed(0) !== 0) {
              distance = distance.toFixed(0);
            }
          }

          users = updateObject(users, {
            [owner.id]: {
              id: owner.id,
              username: owner.name,
              profileImage: owner.image,
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

        sessions.filter(session => session.context.type === 'user')
          .forEach(session => {
            const {context: {id, name: username}} = session;
            users = updateObject(users, {[id]: {id, username}});
          });

        sessions.filter(session => session.context.type === 'playlist')
          .forEach(session => {
            const {context: {id, name}} = session;
            playlists = updateObject(playlists, {[id]: {id, name, members: [], tracks: []}});
          });

        if (Object.keys(playlists).length !== 0) {
          dispatch(addPlaylists(playlists));
        }

        dispatch(addArtists(music.artists));
        dispatch(addAlbums(music.albums));
        dispatch(addTracks(music.tracks));
        dispatch(addPeople(users));
        dispatch(addSessions(followingSessions));
        dispatch(actions.paginateFollowingSessionsSuccess(sessionIDs, sessionIDs.length === 15));
      }
    } catch (err) {
      dispatch(actions.paginateFollowingSessionsFailure(err));
    }
  };
}