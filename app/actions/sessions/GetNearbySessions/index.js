'use strict';

/**
 * @module GetNearbySessions
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

/**
 * Async function which gets the current sessions from Ultrasound
 * 
 * @async
 * @function getNearbySessions
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns  {Promise}
 * @resolves {object}  The session objects retrieved from Ultrasound
 * @rejects  {Error}   The error which caused the get nearby sessions failure
 */
export function getNearbySessions(): ThunkAction {
  return async (dispatch, _, {getFirebase}) => {
    dispatch(actions.getNearbySessionsRequest());

    const firebase = getFirebase();

    let playlists = {};
    let users = {};
    let sessions = [];

    try {
      const permission = await Permissions.request('location', { type: 'whenInUse' });

      if (permission === 'denied' || permission === 'restricted') {
        dispatch(actions.getNearbySessionsFailure(new Error('Unauthorized')));
      } else {
        if (permission === 'undetermined') {
          await Permissions.request('location', {type: 'whenInUse'});
        }

        const pos = await getUserLocation();

        dispatch(addCurrentLocation(pos.coords));

        let count = 0;
        let total = 0;
        let {latitude: coordLat, longitude: coordLon} = pos.coords;

        while (
          total < 15
          || (
            coordLat - (count * 10) > -90
            && coordLat + (count * 10) < 90
          )
        ) {
          count++;

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
              total = Object.values(regions.val()).length;
              sessions = Object.values(regions.val())
                .sort(({lat: latA, lon: lonA}, {lat: latB, lon: lonB}) => {
                  const distA = calculateDistance(coordLat, coordLon, latA, lonA);
                  const distB = calculateDistance(coordLat, coordLon, latB, lonB);

                  return distA < distB ? -1 : distA > distB ? 1 : 0;
                })
                .slice(0, 15);
            } else {
              total = 15;
            }
          } else {
            throw new Error('Unable to retrieve sessions from Ultrasound');
          }
        }

        if (sessions.length === 0) {
          dispatch(actions.getNearbySessionsSuccess([], count));
        } else {
          const sessionIDs = sessions.map(session => session.id);
          const tracksToFetch = sessions.map(session => session.currentTrackID);
          const tracksRes = await Spotify.getTracks(tracksToFetch, {});
          const music = addMusicItems(tracksRes.tracks);

          const nearbySessions = sessions.reduce((obj, session) => {
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
  
            if (coords && pos.coords) {
              distance = calculateDistance(
                coords.lat,
                coords.lon,
                pos.coords.latitude,
                pos.coords.longitude,
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
          dispatch(addPeople(users));
          dispatch(addSessions(nearbySessions));
          dispatch(actions.getNearbySessionsSuccess(sessionIDs, sessionIDs.length === 15));
        }
      }
    } catch (err) {
      dispatch(actions.getNearbySessionsFailure(err));
    }
  };
}