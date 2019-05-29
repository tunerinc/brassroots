'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddCurrentContext
 */

import * as types from '../types';
import {
  type Action,
  type Context,
} from '../../../reducers/queue';

/**
 * Add the current context of a session's queue
 * 
 * @alias module:AddCurrentContext
 * @function addCurrentContext
 * 
 * @author Aldo Gonzalez <aldo@tuenrinc.com>
 * 
 * @param   {object} context          The context from which a session is playing music from
 * @param   {string} context.id       The Spotify id of the context
 * @param   {string} context.name     The name of the context
 * @param   {string} context.type     The type of context a session is playng from
 * @param   {string} context.username The username of the owner of the context item
 * @param   {number} context.position The position from which to start retrieving tracks from the context
 * 
 * @returns {object}                  Redux action with the type of ADD_CURRENT_CONTEXT and a session's context
 */
export function addCurrentContext(
  context: Context,
): Action {
  return {
    type: types.ADD_CURRENT_CONTEXT,
    context,
  };
}