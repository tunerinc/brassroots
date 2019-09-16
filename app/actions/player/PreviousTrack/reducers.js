'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PreviousTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Confirms the success of playing the previous track
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                 The Redux state
 * @param   {object} action                The Redux action
 * @param   {string} action.type           The type of Redux action
 * @param   {string} action.currentQueueID The Brassroots id of the new current track
 * @param   {string} action.currentTrackID The Spotify id of the new current track
 * @param   {number} action.durationMS     The duration of the previous track in milliseconds
 * @param   {string} [action.prevQueueID]  The Brassroots id of the new previous track
 * @param   {string} [action.prevTrackID]  The Spotify id of the new previous track
 * 
 * @returns {object}                       The state with the previous track playing
 */
export function success(
  state: State,
  action: Action,
): State {
  const {currentQueueID, currentTrackID, durationMS, prevQueueID, prevTrackID} = action;

  return updateObject(state, {
    currentQueueID,
    currentTrackID,
    prevQueueID,
    prevTrackID,
    durationMS,
    progress: 0,
    skippingPrev: false,
    paused: false,
    error: null,
  });
}