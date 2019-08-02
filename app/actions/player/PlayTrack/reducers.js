'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module PlayTrackReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/player';

/**
 * Starts the request to play a track in the current session
 * 
 * @function request
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state The Redux state
 * 
 * @returns {object}       The updated state with the attemptingToPlay prop updated
 */
export function request(
  state: State,
): State {
  return updateObject(state, {attemptingToPlay: true, error: null});
}

/**
 * Confirms the success of playing a track in the current session
 * 
 * @function success
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                 The Redux state
 * @param   {object} action                The Redux action
 * @param   {string} action.type           The type of Redux action
 * @param   {string} action.currentQueueID The currently playing track's queue id
 * @param   {string} action.currentTrackID The currently playing track's Spotify id
 * @param   {number} action.durationMS     The duration of the track in milliseconds
 * @param   {string} action.prevQueueID    The previous track's queue id
 * @param   {string} action.prevTrackID    The previous track's Spotify id
 * 
 * @returns {object}                       The state with the current track updated
 */
export function success(
  state: State,
  action: Action,
): State {
  const {currentQueueID: prevQueueID, currentTrackID: prevTrackID} = state;
  const {durationMS, currentQueueID, currentTrackID} = action;

  return updateObject(state, {
    currentQueueID,
    currentTrackID,
    durationMS,
    prevQueueID: currentQueueID === prevQueueID ? null : prevQueueID,
    prevTrackID: currentTrackID === prevTrackID ? null : prevTrackID,
    progress: 0,
    attemptingToPlay: false,
    paused: false,
    error: null,
  });
}

/**
 * Adds the error which caused the play track failure
 * 
 * @function failure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state        The Redux state
 * @param   {object} action       The Redux action
 * @param   {string} action.type  The type of Redux action
 * @param   {Error}  action.error The error which caused the play track failure
 * 
 * @returns {object}              The state with the error prop updated
 */
export function failure(
  state: State,
  action: Action,
): State {
  const {error} = action;
  return updateObject(state, {error, attemptingToPlay: false});
}