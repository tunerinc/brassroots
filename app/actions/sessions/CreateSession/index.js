'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateSession
 */

import moment from 'moment';
import Permissions from 'react-native-permissions';
import getMySavedTracks from '../../../utils/spotifyAPI/getMySavedTracks';
import getUserLocation from '../../../utils/getUserLocation';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {playTrack} from '../../player/PlayTrack';
import {addEntities} from '../../entities/AddEntities';
import {updatePlayer} from '../../player/UpdatePlayer';
import {updateQueue} from '../../queue/UpdateQueue';
import {updateSessions} from '../UpdateSessions';
import {type TrackArtist} from '../../../reducers/tracks';
import {
  type ThunkAction,
  type Session,
} from '../../../reducers/sessions';
import {type Context} from '../../../reducers/queue';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreDocs,
  type FirestoreBatch,
} from '../../../utils/firebaseTypes';

type User = {|
  id: string,
  displayName: string,
  profileImage: string,
  totalFollowers: number,
|};

type Track = {|
  trackID?: string,
  timeAdded?: string | number,
  id: string,
  name: string,
  trackNumber: number,
  durationMS: number,
  artists: Array<TrackArtist>,
  album: {
    id: string,
    name: string,
    small: string,
    medium: string,
    large: string,
    artists: Array<TrackArtist>,
  },
|};

type Coords = {
  lat?: number,
  lon?: number,
  coords?: {
    latitude: number,
    longitude: number,
  },
};

/**
 * Async function that creates a new session for the current user
 * 
 * @async
 * @alias module:CreateSession
 * @function createSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {object}   user                       The current user object
 * @param    {string}   user.id                    The user id of the current user
 * @param    {string}   user.displayName           The display name of the current user
 * @param    {string}   user.profileImage          The profile image of the current user
 * @param    {number}   user.totalFollowers        The total amount of followers the current user has
 * @param    {object}   track                      The track object to create the session with
 * @param    {string}   track.id                   The Spotify id of the track to play
 * @param    {string}   track.name                 The name of the track to play
 * @param    {number}   track.durationMS           The duration in ms of the track
 * @param    {number}   track.trackNumber          The track number of the track in its respective album
 * @param    {object}   track.album                The album object of the respective track
 * @param    {string}   track.album.id             The Spotify id of the track's album
 * @param    {string}   track.album.name           The name of the track's album
 * @param    {string}   [track.album.small]        The 64x64 size of the album's artwork, if available
 * @param    {string}   [track.album.medium]       The 300x300 size of the album's artwork, if available
 * @param    {string}   [track.album.large]        The 640x640 size of the album's artwork, if available
 * @param    {object[]} track.album.artists        The artist objects for all of the album's artists 
 * @param    {string}   track.album.artists[].id   The Spotify id for the album's artist
 * @param    {string}   track.album.artists[].name The name of the album's artist
 * @param    {object[]} track.artists              The artist objects for all of the track's artists 
 * @param    {string}   track.artists[].id         The Spotify id for the track's artist
 * @param    {string}   track.artists[].name       The name of the track's artist
 * @param    {object}   context                    The context of what the current user selected to play
 * @param    {string}   context.id                 The id of the item the user selected
 * @param    {string}   context.name               The name of the context, applicable with playlist, album, artist
 * @param    {string}   context.type               The type of item the user selected (playlist, album, artist, track)
 * @param    {string}   context.username           The username of the user, applicable with the "user" prefix
 * @param    {number}   context.total              The total amount of tracks in the context
 * @param    {number}   context.position           The index from which to start the more to play from the context
 * @param    {string[]} [context.tracks]           The Spotify ids of the next tracks from the context is from user's saved library
 * @param    {string}   mode                       The session mode preference of the current user
 *
 * @returns  {Promise}
 * @resolves {object}                              The newly created session object for the current user
 * @rejects  {Error}                               The error which caused the create session failure
 */
export function createSession(
  user: User,
  track: Track,
  context: Context,
  mode: string,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const geoRef: FirestoreRef = firestore.collection('geo');
    const sessionsRef: FirestoreRef = firestore.collection('sessions');
    const userRef: FirestoreDoc = firestore.collection('users').doc(user.id);
    // const geoFirestore = new GeoFirestore(geoRef);

    try {
      const permission: string = await Permissions.request('location', { type: 'whenInUse' });
      const newSessionDoc: FirestoreDoc = sessionsRef.doc();
      const newSessionKey: string = newSessionDoc.id;
      const queueRef: FirestoreDocs = newSessionDoc.collection('queue');
      const newTrackDoc: FirestoreDoc = queueRef.doc();
      const newTrackID: string = newTrackDoc.id;

      let batch: FirestoreBatch = firestore.batch();
      let pos: Coords = {};
      let session: Session = {coords: null};

      if (permission === 'authorized') {
        pos = await getUserLocation();
      } else if (permission === 'undetermined') {
        await Permissions.request('location', {type: 'whenInUse'});
        pos = await getUserLocation();
      }

      if (pos.coords) {
        pos = updateObject(pos, {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });

        user = updateObject(user, {coords: {...pos}});
      }
      if (
        context.type === 'user-tracks'
        && Array.isArray(context.tracks)
        && context.tracks.length !== 3
        && typeof context.position === 'number'
        && typeof context.total === 'number'
        && (context.tracks.length + context.position + 1) < context.total
      ) {
        const options: {
          limit: number,
          offset: number,
          market: string,
        } = {
          limit: 3 - context.tracks.length,
          offset: context.tracks.length + context.position + 1,
          market: 'US',
        };

        const {items} = await getMySavedTracks(options);

        context = updateObject(context, {
          tracks: Array.isArray(context.tracks)
            ? [...context.tracks, ...items.map(item => item.track.id)]
            : context.tracks,
        });
      }

      const timeJoined: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');
      const {total: contextTotal, ...restOfContext} = context;

      session = updateObject(session, {
        mode,
        id: newSessionKey,
        currentTrackID: track.id,
        currentQueueID: newTrackID,
        ownerID: user.id,
        distance: 0,
        totalListeners: 1,
      });

      dispatch(actions.success());
      dispatch(updateQueue({context}));
      dispatch(
        addEntities(
          {
            sessions: {[session.id]: session},
            users: {[user.id]: {...user, currentSessionID: session.id}},
          },
        ),
      );

      dispatch(updateSessions({currentSessionID: session.id}));
      dispatch(
        updatePlayer(
          {
            currentQueueID: session.currentQueueID,
            currentTrackID: session.currentTrackID,
          },
        ),
      );

      batch.update(userRef, {currentSession: newSessionKey, online: true});
      batch.set(userRef.collection('sessions').doc(newSessionKey), {id: newSessionKey, timeJoined});
      batch.set(
        sessionsRef.doc(newSessionKey),
        {
          mode,
          id: newSessionKey,
          progress: 0,
          currentTrackID: track.id,
          currentQueueID: newTrackID,
          timeLastPlayed: timeJoined,
          live: true,
          paused: true,
          repeat: false,
          seeking: false,
          shuffle: false,
          coords: typeof pos.lat === 'number' && typeof pos.lon === 'number' ? {...pos} : null,
          context: {
            ...restOfContext,
            tracks: context.tracks || null,
          },
          owner: {
            id: user.id,
            name: user.displayName,
            image: user.profileImage,
            followers: []
          },
          totals: {
            context: contextTotal,
            followers: user.totalFollowers,
            listeners: 1,
            messages: 0,
            previouslyPlayed: 0,
            queue: 1,
            users: 1,
          },
        },
      );

      batch.set(
        queueRef.doc(newTrackID),
        {
          track,
          id: newTrackID,
          prevQueueID: null,
          prevTrackID: null,
          nextQueueID: null,
          nextTrackID: null,
          totalLikes: 0,
          likes: [],
          timeAdded: firestore.FieldValue.serverTimestamp(),
          isCurrent: true,
          user: {
            id: user.id,
            displayName: user.displayName,
            profileImage: user.profileImage,
          },
        }
      );

      batch.set(
        newSessionDoc.collection('users').doc(user.id),
        {
          timeJoined,
          id: user.id,
          displayName: user.displayName,
          profileImage: user.profileImage,
          active: true,
          totalFollowers: user.totalFollowers,
          updatedFollowers: false,
          paused: true,
          progress: 0,
          muted: false,
        },
      );

      await batch.commit();

      dispatch(
        // $FlowFixMe
        playTrack(
          user,
          {...track, id: newTrackID, trackID: track.id},
          {id: session.id, totalPlayed: 0},
          null,
        ),
      );
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}