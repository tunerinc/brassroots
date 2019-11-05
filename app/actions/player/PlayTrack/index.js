'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PlayTrack
 */

import moment from 'moment';
import Spotify from 'rn-spotify-sdk';
import getMySavedTracks from '../../../utils/spotifyAPI/getMySavedTracks';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';
import {addRecentTrack} from '../../tracks/AddRecentTrack';
import {type TrackArtist} from '../../../reducers/tracks';
import {type ThunkAction} from '../../../reducers/player';
import {
  type FirestoreInstance,
  type FirestoreRef,
  type FirestoreDoc,
  type FirestoreDocs,
} from '../../../utils/firebaseTypes';

type User = {
  id: string,
  displayName: string,
  profileImage: string,
};

type Track = {
  id?: ?string,
  trackID: string,
  durationMS: number,
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
};

type Session = {
  id: string,
  totalPlayed: number,
  totalQueue?: number,
  totalUsers?: number,
  coords?: {
    lat: number,
    lon: number,
  },
  current?: {
    id: string,
    totalLikes: number,
    userID: string,
    prevQueueID: string,
    prevTrackID: string,
    nextQueueID: ?string,
    nextTrackID: ?string,
    track: {
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
    },
  }
};

type Context = ?{
  id: string,
  name: string,
  type: string,
  displayName: string,
  position: number,
  total: number,
  tracks: ?Array<string>,
};

/**
 * Async function that plays a track the current user has selected
 * 
 * @async
 * @function playTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param    {object}   user                                     The user object of the current user playing a track
 * @param    {string}   user.id                                  The id of the current user
 * @param    {string}   user.displayName                         The display name of the current user
 * @param    {string}   user.profileImage                        The profile image of the current user
 * 
 * @param    {object}   track                                    The track object the current user is wanting to play
 * @param    {string}   [track.id]                               The queue id of the track to play
 * @param    {string}   track.trackID                            The Spotify id of the track to play
 * @param    {string}   track.name                               The name of the track
 * @param    {number}   track.durationMS                         The duration of the track in milliseconds
 * @param    {object}   track.album                              The album the track is in
 * @param    {string}   track.album.id                           The Spotify id of the album
 * @param    {string}   track.album.name                         The name of the album
 * @param    {string}   [track.album.small]                      64x64 size of the album artwork
 * @param    {string}   [track.album.medium]                     320x320 size of the album artwork
 * @param    {string}   [track.album.large]                      640x640 size of the album artwork
 * @param    {object[]} track.artists                            The track artists
 * @param    {string}   track.artists.id                         The Spotify id of the track artist
 * @param    {string}   track.artists.name                       The name of the track artist
 * 
 * @param    {object}   session                                  The session object the current user is currently in
 * @param    {string}   session.id                               The id of the session the current user is in
 * @param    {number}   session.totalPlayed                      The total amoun of played tracks in the session
 * @param    {number}   [session.totalUsers]                     The total amount of listeners in the session, only if context change
 * @param    {object}   [session.current]                        The currently playing track in the session
 * @param    {string}   session.current.id                       The queue id of the current track, if available
 * @param    {object}   session.current.track                    The currently playing track's Spotify information
 * @param    {string}   session.current.track.id                 The Spotify track id of the current track
 * @param    {string}   session.current.track.name               The name of the track
 * @param    {number}   session.current.track.durationMS         The duration of the track in milliseconds
 * @param    {number}   session.current.track.trackNumber        The track number of the track within the album
 * @param    {object}   session.current.track.album              The album the track is in
 * @param    {string}   session.current.track.album.id           The Spotify id of the album
 * @param    {string}   session.current.track.album.name         The name of the album
 * @param    {string}   [session.current.track.album.small]      64x64 size of the album artwork
 * @param    {string}   [session.current.track.album.medium]     320x320 size of the album artwork
 * @param    {string}   [session.current.track.album.large]      640x640 size of the album artwork
 * @param    {object[]} session.current.track.album.artists      The album artists
 * @param    {string}   session.current.track.album.artists.id   The Spotify id of the album artist
 * @param    {string}   session.current.track.album.artists.name The name of the album artist
 * @param    {object[]} session.current.track.artists            The track artists
 * @param    {string}   session.current.track.artists.id         The Spotify id of the track artist
 * @param    {string}   session.current.track.artists.name       The name of the track artist
 * @param    {number}   session.current.totalLikes               The total amount of likes the current track has
 * @param    {string}   session.current.userID                   The id of the user who queued the track
 * @param    {string}   [session.current.nextQueueID]            The queue id of the next track from the current track
 * @param    {string}   [session.current.nextTrackID]            The Spotify id of the next track from the current
 * @param    {object}   [session.coords]                         The coordinates of the session the current user is in
 * @param    {number}   session.lat                              The latitude of the gps coordinates
 * @param    {number}   session.lon                              The longitude of the gps coordinates
 * 
 * @param    {object}   [context]                                The context of the tracks the current user wants to play, explicitly playing only
 * @param    {string}   context.id                               The id of the context of tracks
 * @param    {string}   context.name                             The name of the context, applicable with playlist, album, artist
 * @param    {string}   context.type                             The type of context, i.e. track, playlist, album, artist
 * @param    {string}   context.displayName                      The display name of the user, applicable with the "user" prefix
 * @param    {number}   context.position
 * @param    {number}   context.total
 *
 * @return   {Promise}
 * @resolves {object}                                            The session object with the now playing track
 * @rejects  {Error}                                             The error which caused the play track failure
 */
export function playTrack(
  user: User,
  track: Track,
  session: Session,
  context: ?Context,
): ThunkAction {
  return async (dispatch, _, {getFirestore}) => {
    dispatch(actions.request());

    const firestore: FirestoreInstance = getFirestore();
    const sessionRef: FirestoreDoc = firestore.collection('sessions').doc(session.id);
    const sessionPrevRef: FirestoreDocs = sessionRef.collection('previouslyPlayed');
    const sessionQueueRef: FirestoreDocs = sessionRef.collection('queue');
    const sessionUserRef: FirestoreDoc = sessionRef.collection('users').doc(user.id);
    const geoRef: FirestoreRef = firestore.collection('geo');
    // const geoFirestore = new GeoFirestore(geoRef);
    const {totalPlayed, current, coords} = session;

    let batch = firestore.batch();

    try {
      if (!track.id) {
        const queueDoc: FirestoreDoc = sessionQueueRef.doc();
        const queueID: string = queueDoc.id;
        track = updateObject(track, {id: queueID});
      }

      await Spotify.playURI(`spotify:track:${track.trackID}`, 0, 0);
      dispatch(actions.success(track.id, track.trackID, track.durationMS));

      if (
        context
        && context.type === 'user-tracks'
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
          tracks: Array.isArray(context.tracks) && Array.isArray(items)
            ? [...context.tracks, ...items.map(item => item.track.id)]
            : context.tracks,
        });
      }

      batch.update(sessionUserRef, {paused: false, progress: 0});
      batch.update(
        sessionRef,
        {
          progress: 0,
          currentQueueID: track.id,
          currentTrackID: track.trackID,
          timeLastPlayed: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          paused: false,
          ...(context
            ? {
              'context.id': context.id,
              'context.name': context.name,
              'context.type': context.type,
              'context.displayName': context.displayName,
              'context.position': context.position,
              'context.tracks': Array.isArray(context.tracks) ? context.tracks : null,
              'totals.context': context.total,
              'totals.previouslyPlayed': totalPlayed + 1,
            }
            : {}
          ),
        },
      );

      if (context && current) {
        // dispatch(addRecentTrack(user.id, current.track));
        const queueTrack = await sessionQueueRef.doc(current.id).get();

        if (!queueTrack.exists) {
          throw new Error('Unable to retrieve current track from Firestore');
        }

        batch.set(
          sessionPrevRef.doc(current.id),
          {
            id: current.id,
            userID: current.userID,
            totalLikes: current.totalLikes,
            prevQueueID: queueTrack.data().prevQueueID,
            prevTrackID: queueTrack.data().prevTrackID,
            nextQueueID: track.id,
            nextTrackID: track.trackID,
            track: {...current.track},
          },
        );

        batch.set(
          sessionQueueRef.doc(track.id),
          {
            user,
            id: track.id,
            likes: [],
            totalLikes: 0,
            timeAdded: firestore.FieldValue.serverTimestamp(),
            isCurrent: true,
            prevQueueID: current.id,
            prevTrackID: current.track.id,
            nextQueueID: current.nextQueueID || null,
            nextTrackID: current.nextTrackID || null,
            track: {...track, id: track.trackID, trackID: null},
          },
        );

        if (current.nextQueueID) {
          batch.update(sessionQueueRef.doc(current.nextQueueID),
            {
              prevQueueID: track.id,
              prevTrackID: track.trackID,
            },
          );
        }

        batch.delete(sessionQueueRef.doc(current.id));
      }

      await batch.commit();
    } catch (err) {
      dispatch(actions.failure(err));
    }
  };
}
