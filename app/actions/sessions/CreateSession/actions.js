'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module CreateSession
 */

import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

/**
 * Notify the app of a create session request
 * 
 * @alias module:CreateSession
 * @function createSessionRequest
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @returns {object} Redux action with the type of CREATE_SESSION_REQUEST
 */
export function createSessionRequest(): Action {
  return {
    type: types.CREATE_SESSION_REQUEST,
  };
}

/**
 * Notify the app of a create session success
 * 
 * @alias module:CreateSession
 * @function createSessionSuccess
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {object}   session                The newly created session
 * @param   {string}   session.id             The Brassroots id of the created session
 * @param   {string}   session.currentTrackID The Spotify id of the current queue track playing
 * @param   {string}   session.currentQueueID The Brassroots id of the current queue track playing
 * @param   {string}   session.ownerID        The Brassroots/Spotify id of the session owner
 * @param   {string}   session.mode           The mode the session is currently in
 * @param   {number}   session.distance       The distance of the session to the current user
 * @param   {number}   session.totalListeners The total amount of listeners in the session
 *
 * @returns {object}         Redux action with the type of CREATE_SESSION_REQUEST and the new session for the current user
 */
export function createSessionSuccess(
  session: Session,
): Action {
  return {
    type: types.CREATE_SESSION_SUCCESS,
    session,
  };
}

/**
 * Notify the app of a create session failure
 * 
 * @alias module:CreateSession
 * @function createSessionFailure
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 *
 * @param   {Error}  error The error which caused the create session failure
 *
 * @returns {object}       Redux action with the type of CREATE_SESSION_FAILURE and the error which caused the failure
 */
export function createSessionFailure(
  error: Error,
): Action {
  return {
    type: types.CREATE_SESSION_FAILURE,
    error,
  };
}