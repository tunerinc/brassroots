'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module NextTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  lastUpdated,
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Starts the request to play the next track available
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The state with the skippingNext prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {skippingNext: true, error: null});
}

/**
 * Confirms the success of playing the next track available
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
 * @param   {string} [action.nextQueueID]  The Brassroots id of the next track in user queue, if available
 * @param   {string} [action.nextTrackID]  The Spotify id of the next track in user queue, if available
 * @param   {number} action.durationMS     The duration of the current track in milliseconds
 * 
 * @returns {object}                       The state with the next track available playing
 */
export function success(
  state: State,
  action: Action,
): State {
  const {currentQueueID: prevQueueID, currentTrackID: prevTrackID} = state;
  const {durationMS, nextQueueID, nextTrackID, currentQueueID, currentTrackID} = action;
  
  return updateObject(state, {
    lastUpdated,
    prevQueueID,
    prevTrackID,
    currentQueueID,
    currentTrackID,
    durationMS,
    nextQueueID,
    nextTrackID,
    progress: 0,
    skippingNext: false,
    paused: false,
    error: null,
  });
}

/**
 * Adds the error which caused the next track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the next track failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, skippingNext: false});
}