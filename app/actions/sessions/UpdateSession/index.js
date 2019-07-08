'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module UpdateSession
 */

import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

/**
 * Updates a single session with new values
 * 
 * @alias module:UpdateSession
 * @function updateSession
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {string} sessionID                The Brassroots id of the session to update
 * @param   {object} updates                  The udpates to make to a single session
 * @param   {string} [updates.currentTrackID] The Spotify id of the new current track playing
 * @param   {string} [updates.currentQueueID] The Brassroots id of the new current track playing
 * @param   {string} [updates.ownerID]        The Brassrootds id of the new session owner
 * @param   {number} [updates.distance]       The new distance of the session owner to the current user in miles
 * @param   {string} [updates.mode]           The new mode for the single session
 * @param   {number} [updates.totalListeners] The total amount of listeners inside of the session
 * 
 * @returns {object}                          Redux action with the type of UPDATE_SESSION and the updates to make to a single session
 */
export function updateSession(
  sessionID: string,
  updates: Session,
): Action {
  return {
    type: types.UPDATE_SESSION,
    sessionID,
    updates,
  };
}