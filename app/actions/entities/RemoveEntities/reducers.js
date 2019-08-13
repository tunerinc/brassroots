'use strict';

/**
 * @format
 * @flow
 */

/**
 * @module RemoveEntitiesReducers
 */

import updateObject from '../../../utils/updateObject';
import {
  type Action,
  type State,
  type Entity,
} from '../../../reducers/entities';

/**
 * Removes entities from a single node in the entities state
 * 
 * @function removeEntity
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                     The Redux state
 * @param   {object}   action                    The Redux action
 * @param   {string}   action.type               The type of Redux action
 * @param   {string[]} action.ids                The ids of the entities to remove from the node
 * @param   {object}   action.entities           The entities to remove
 * @param   {object}   [entities.albums]         The album entities to remove
 * @param   {object}   [entities.artists]        The artist entities to remove
 * @param   {object}   [entities.conversations]  The conversation entities to remove
 * @param   {object}   [entities.groups]         The group entities to remove
 * @param   {object}   [entities.messages]       The message entities to remove
 * @param   {object}   [entities.playlists]      The playlist entities to remove
 * @param   {object}   [entities.playlistTracks] The playlist track entities to remove
 * @param   {object}   [entities.queueTracks]    The queue track entities to remove
 * @param   {object}   [entities.sessions]       The session entities to remove
 * @param   {object}   [entities.tracks]         The track entities to remove
 * @param   {object}   [entities.users]          The user entities to remove
 * 
 * @returns {object}                             The single entities node with the entities removed
 */
export function removeEntity(
  state: Entity,
  action: Action,
): Entity {
  const {allIDs: oldIDs, byID} = state;
  const {ids} = action;
  const allIDs: Array<string> = (
    Array.isArray(oldIDs)
    && Array.isArray(ids)
  )
    ? oldIDs.filter(id => !ids.includes(id))
    : [];

  const updates: Entity = Array.isArray(ids) && typeof byID === 'object'
    ? {
      allIDs,
      total: allIDs.length,
      byID: allIDs.reduce((obj, key) => updateObject(obj, {[key]: {...byID[key]}}), {}),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * Removes entities from Redux
 * 
 * @function removeEntities
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                     The Redux state
 * @param   {object} action                    The Redux action
 * @param   {string} action.type               The type of Redux action
 * @param   {object} action.entities           The entities to remove
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
 * @returns {object}                           The state with the entities removed
 */
export function removeEntities(
  state: State,
  action: Action,
): State {
  const {entities} = action;

  let newState: State = {};

  if (typeof entities === 'object' && typeof state === 'object') {
    const entityTypes: Array<string> = Object.keys(entities);
    const typesToCopy: Array<string> = Object.keys(state).filter(ley => !entityTypes.includes(ley));

    entityTypes.forEach(type => {
      if (typeof entities[type] === 'object') {
        const newAction: Action = {...action, ids: Object.keys(entities[type])};
        const entity: Entity = removeEntity(state[type], newAction);
        newState = updateObject(newState, {[type]: {...entity}});
      }
    });

    typesToCopy.forEach(type => {
      newState = updateObject(newState, {[type]: {...state[type]}});
    });
  }

  return newState;
}