'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module AddEntities
 */

import * as types from '../types';
import {
  type Action,
  type EntityType,
} from '../../../reducers/entities';

type Entities = {+[type: string]: {+[id: string]: EntityType}};

/**
 * Adds entities to Redux
 * 
 * @alias module:AddEntities
 * @function addEntities
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} entities                  The entities to add to Redux
 * @param   {object} [entities.albums]         The album entities to add
 * @param   {object} [entities.artists]        The artist entities to add
 * @param   {object} [entities.conversations]  The conversation entities to add
 * @param   {object} [entities.groups]         The group entities to add
 * @param   {object} [entities.messages]       The message entities to add
 * @param   {object} [entities.playlists]      The playlist entities to add
 * @param   {object} [entities.playlistTracks] The playlist track entities to add
 * @param   {object} [entities.queueTracks]    The queue track entities to add
 * @param   {object} [entities.sessions]       The session entities to add
 * @param   {object} [entities.tracks]         The track entities to add
 * @param   {object} [entities.users]          The user entities to add
 * 
 * @returns {object}                           Redux action with the type of ADD_ENTITIES and the entities to add
 */
export function addEntities(
  entities: Entities,
  refreshing?: boolean = false,
): Action {
  return {
    type: types.ADD_ENTITIES,
    entities,
    refreshing,
  };
}