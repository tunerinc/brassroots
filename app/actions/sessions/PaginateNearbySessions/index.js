'use strict';

/**
 * @module PaginateNearbySessions
 */

import Spotify from 'rn-spotify-sdk';
import addMusicItems from '../../../utils/addMusicItems';
import calculateDistance from '../../../utils/calculateDistance';
import updateObject from '../../../utils/updateObject';
import {addAlbums} from '../../albums/AddAlbums';
import {addArtists} from '../../artists/AddArtists';
import {addTracks} from '../../tracks/AddTracks';
import {addPlaylists} from '../../playlists/AddPlaylists';
import {addUsers} from '../../users/AddUsers';
import {addSessions} from '../AddSessions';
import * as actions from './actions';

/**
 * Async function that paginates the nearby sessions for the current user
 * 
 * @async
 * @function paginateNearbySessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @return   {Promise}
 * @resolves {array}   The nearby sessions listed in order of closest to farthest distance to the current user
 * @rejects  {Error}   The error which caused the paginate nearby sessions failure
 */
export function paginateNearbySessions() {
  return async (dispatch, _, {getFirebase, getFirestore}) => {
    dispatch(actions.paginateNearbySessionsRequest());

    const firebase = getFirebase();

    let playlists = {};
    let users = {};
    let sessions = [];

    let {
      sessions: {nearbyCount, nearbySessions},
      users: {coords: userCoords},
    } = state;

    try {
      if (!userCoords) {
        dispatch(actions.paginateNearbySessionsFailure(new Error('Unauthorized')));
      } else {
        const {lat: coordLat, lon: coordLon} = userCoords;

        let count = 0;
        let total = 0;

        while (
          total < 15
          || (
            coordLat - (count * 10) > -90
            && coordLat + (count * 10) < 90
          )
        ) {
          count++;

          if (nearbyCount !== 0 && nearbyCount >= count) {
            count = nearbyCount;
          }

          const fbFilterRef = firebase.database().ref('sessions/filtered');
          const regions = await fbFilterRef.orderByChild('lat')
            .startAt(coordLat - (count * 10))
            .endAt(coordLat + (count * 10))
            .once('value');
          
          if (regions) {
            if (
              regions.val()
              && Object.keys(regions.val()).length !== 0
              && Object.keys(regions.val()).length !== total
            ) {
              total = Object.keys(regions.val()).length;
              sessions = Object.values(regions.val())
                .filter(session => nearbySessions.indexOf(session.id) === -1)
                .sort(({ lat: latA, lon: lonA }, { lat: latB, lon: lonB }) => {
                  const distA = calculateDistance(coordLat, coordLon, latA, lonA);
                  const distB = calculateDistance(coordLat, coordLon, latB, lonB);

                  return distA < distB ? -1 : distA > distB ? 1 : 0;
                })
                .slice(0, 15);
            } else {
              total = 15;
            }
          } else {
            throw new Error('Unable to retrieve regions from Ultrasound');
          }
        }

        if (sessions.length === 0) {
          dispatch(actions.paginateNearbySessionsSuccess([], count));
        } else {
          const sessionIDs = sessions.map(session => session.id);
          const tracksToFetch = sessions.map(session => session.currentTrackID);
          const tracksRes = await Spotify.getTracks(tracksToFetch, {});
          const music = addMusicItems(tracksRes.tracks);

          const newSessions = sessions.reduce((obj, session) => {
            const {
              coords,
              currentQueueID,
              currentTrackID,
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
                coordLat,
                coordLon,
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
                currentQueueID,
                currentTrackID,
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
          dispatch(addUsers(users));
          dispatch(addSessions(newSessions));
          dispatch(actions.paginateNearbySessionsSuccess(sessionIDs, sessionIDs.length === 15));
        }
      }
    } catch (err) {
      dispatch(actions.paginateNearbySessionsFailure(err));
    }
  };
}