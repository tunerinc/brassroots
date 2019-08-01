'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdatePlayer
 */

import * as types from '../types';
import {
  type Action,
  type Updates,
} from '../../../reducers/player';

/**
 * Update the player with any new information
 * 
 * @function updatePlayer
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}  updates                    The updates to make to the player
 * @param   {boolean} [updates.attemptingToPlay] The new status of whether the current user is attempting to play a track
 * @param   {string}  [updates.prevTrackID]      The Spotify id of the new previous track
 * @param   {string}  [updates.prevQueueID]      The queue id of the new previous track
 * @param   {string}  [updates.currentTrackID]   The Spotify id of the new current track
 * @param   {string}  [updates.currentQueueID]   The queue id of the new current track
 * @param   {string}  [updates.nextTrackID]      The Spotify id of the new next track
 * @param   {string}  [updates.nextQueueID]      The queue id of the new next track
 * @param   {number}  [updates.durationMS]       The duration of the current track in milliseconds
 * @param   {number}  [updates.progress]         The progress of the current track in milliseconds
 * @param   {boolean} [updates.paused]           Whether the player is paused
 * 
 * @returns {object}                             Redux action with the type of UPDATE_PLAYER and the updates to make to the player
 */
export function updatePlayer(
  updates: Updates,
): Action {
  return {
    type: types.UPDATE_PLAYER,
    updates,
  };
}