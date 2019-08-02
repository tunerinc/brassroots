'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdatePlayerReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Updates the player state with new information
 * 
 * @function updatePlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  state 
 * @param   {object}  action 
 * @param   {string}  action.type
 * @param   {object}  action.updates
 * @param   {boolean} action.updates.attemptingToPlay] The new status for whether the current user is attempting to play a track
 * @param   {string}  [action.updates.prevTrackID]     The Spotify id for the new previous track
 * @param   {string}  [action.updates.prevQueueID]     The queue id for the new previous track
 * @param   {string}  [action.updates.currentTrackID]  The Spotify id for the new current track
 * @param   {string}  [action.updates.currentQueueID]  The queue id for the new current track
 * @param   {string}  [action.updates.nextTrackID]     The Spotify id for the new next track
 * @param   {string}  [action.updates.nextQueueID]     The queue id for the new next track
 * @param   {number}  [action.updates.durationMS]      The duration of the current track in milliseconds
 * @param   {number}  [action.updates.progress]        The progress of the current track in milliseconds
 * @param   {boolean} [action.updates.paused]          Whether the player is paused
 * 
 * @returns {object}                                   The state with new updates added
 */
export function updatePlayer(
  state: State,
  action: Action,
): State {
  const {updates} = action;
  return updateObject(state, updates);
}