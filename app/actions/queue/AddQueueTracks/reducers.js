'use strict';

/**
 * @module AddQueueTracksReducers
 */

import updateObject from '../../../utils/updateObject';
import {lastUpdated, singleTrack} from '../../../reducers/queue';

/**
 * Adds a single queue track to Redux
 * 
 * @function addSingleQueueTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state                    The Redux state
 * @param   {object}  action                   The Redux action
 * @param   {string}  action.type              The type of Redux action
 * @param   {object}  action.tracks            The queue tracks to add to Redux
 * @param   {object}  action.track             The single queue track object
 * @param   {string}  action.track.id          The Brassroots id of the single queue track
 * @param   {string}  action.track.trackID     The Spotify id of the single queue track
 * @param   {string}  action.track.userID      The Brassroots id of the user who queued the single track
 * @param   {number}  action.track.totalLikes  The total number of likes the single queue track has
 * @param   {boolean} action.track.liked       Whether the current user has liked the single queue track
 * @param   {number}  action.track.seconds     The seconds when the track was added
 * @param   {number}  action.track.nanoseconds The nanoseconds wehn the track was added
 * 
 * @returns {object}                           The state of the single queue track updated
 */
export function addSingleTrack(state, action) {
  const {track} = action;
  return updateObject(state, {...track});
}

/**
 * Adds queue tracks to Redux
 * 
 * @function addQueueTracks
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state         The Redux state
 * @param   {object} action        The Redux action
 * @param   {string} action.type   The type of Redux action
 * @param   {object} action.tracks The queue tracks to add
 * 
 * @returns {object}               The state with the queue tracks added
 */
export function addQueueTracks(state, action) {
  const {tracks} = action;
  
  let {queueByID} = state;

  Object.values(tracks).forEach(track => {
    const addedTrack = singleTrack(queueByID[track.id], {...action, track});
    queueByID = updateObject(queueByID, {[track.id]: addedTrack});
  });

  return updateObject(state, {
    lastUpdated,
    queueByID,
    totalQueue: Object.keys(queueByID).length,
    error: null,
  });
}