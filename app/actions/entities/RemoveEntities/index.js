'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveEntities
 */

import * as types from '../types';
import {type Action} from '../../../reducers/entities';

type Entities = {
  +albums?: {[id: string]: true},
  +artists?: {[id: string]: true},
  +conversations?: {[id: string]: true},
  +groups?: {[id: string]: true},
  +messages?: {[id: string]: true},
  +playlists?: {[id: string]: true},
  +playlistTracks?: {[id: string]: true},
  +queueTracks?: {[id: string]: true},
  +sessions?: {[id: string]: true},
  +tracks?: {[id: string]: true},
  +users?: {[id: string]: true},
};

export type {
  Entities,
};

/**
 * Removes an entity from Redux
 * 
 * @alias module:RemoveEntities
 * @function removeEntities
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} entities                  The entities to remove from the store
 * @param   {object} [entities.albums]         The album entities to remove
 * @param   {object} [entities.artists]        The artist entities to remove
 * @param   {object} [entities.conversations]  The conversation entities to remove
 * @param   {object} [entities.groups]         The group entities to remove
 * @param   {object} [entities.messages]       The message entities to remove
 * @param   {object} [entities.playlists]      The playlist entities to remove
 * @param   {object} [entities.playlistTracks] The playlist track entities to remove
 * @param   {object} [entities.queueTracks]    The queue track entities to remove
 * @param   {object} [entities.sessions]       The session entities to remove
 * @param   {object} [entities.tracks]         The track entities to remove
 * @param   {object} [entities.users]          The user entities to remove
 * 
 * @returns {object}                           Redux action with the type of REMOVE_ENTITIES and the entities to remove
 */
export function removeEntities(
  entities: Entities,
): Action {
  return {
    type: types.REMOVE_ENTITIES,
    entities,
  };
}