'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentContextReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
} from '../../../reducers/queue';

/**
 * Adds the context of the session the current user is in
 * 
 * @function addCurrentContext
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}          state                   The Redux state
 * @param   {object}          action                  The Redux action
 * @param   {string}          action.type             The type of Redux action
 * @param   {object}          action.context          The new context to add to the state
 * @param   {string}          action.context.id       The Brassroots/Spotify id of the context
 * @param   {string}          action.context.name     The name of the context
 * @param   {string}          action.context.type     The type of context the queue is playing from; user-album, user-artist, user-tracks, playlist, user-recently, user-most, user-favorite, conversation, full-album, full-artist
 * @param   {string}          action.context.username The username of the owner of the context, if applicable
 * @param   {(string|number)} action.context.position The position/cursor in the context from which to start playing from
 * @param   {string[]}        action.context.tracks   The Spotify ids of the tracks next up from the context of a session
 * 
 * @returns {object}                                  The state with the context updated
 */
export function addCurrentContext(
  state: State,
  action: Action,
): State {
  const {context} = action;
  const updates = typeof context === 'object'
    ? {context}
    : {};

  return updateObject(state, updates);
}