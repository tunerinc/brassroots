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
 * Starts the request to play the previous track
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the skippingPrev prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {skippingPrev: true, error: null});
}

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

/**
 * Adds the error which caused the previous track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the previous track failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, skippingPrev: false});
}