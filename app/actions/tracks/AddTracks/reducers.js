'use strict';

/**
 * @module AddTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleTrack, lastUpdated} from '../../../reducers/tracks';

/**
 * Adds a single track to Redux
 * 
 * @function addSingleTrack
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                    The Redux state
 * @param   {object}   action                   The Redux action
 * @param   {string}   action.type              The type of Redux action
 * @param   {object}   action.tracks            The Spotify tracks to add
 * @param   {object}   action.track             The track object to add
 * @param   {string}   action.track.id          The Spotify id of the track
 * @param   {string}   action.track.name        The name of the Spotify track
 * @param   {string}   action.track.albumID     The Spotify id of the track's album
 * @param   {string[]} action.track.artists     The Spotify ids of the track artists
 * @param   {number}   action.track.trackNumber The track number of the track within the corresponding album
 * @param   {number}   action.track.durationMS  The duration of the track in milliseconds
 * 
 * @returns {object}                            The state with the single track added
 */
export function addSingleTrack(state, action) {
  const {track} = action;
  return updateObject(state, {...track});
}

/**
 * Adds Spotify tracks to Redux
 * 
 * @function addTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {object} action.tracks The Spotify tracks to add
 * 
 * @returns {object}               The state with the Spotify tracks added
 */
export function addTracks(state, action) {
  const {tracks} = action;

  let {tracksByID} = state;

  Object.values(tracks).forEach(track => {
    const addedTrack = singleTrack(tracksByID[track.id], {...action, track});
    tracksByID = updateObject(tracksByID, {[track.id]: addedTrack});
  });

  return updateObject(state, {
    lastUpdated,
    tracksByID,
    totalTracks: Object.keys(tracksByID).length,
  });
}