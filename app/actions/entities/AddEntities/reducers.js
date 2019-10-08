'use strict';

/**
 * @module AddEntitiesReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleEntityType} from '../../../reducers/entities';
import {album} from '../../../reducers/albums';
import {artist} from '../../../reducers/artists';
import {conversation, message} from '../../../reducers/conversations';
import {group} from '../../../reducers/groups';
import {playlist, playlistTrack} from '../../../reducers/playlists';
import {queueTrack} from '../../../reducers/queue';
import {session} from '../../../reducers/sessions';
import {track} from '../../../reducers/tracks';
import {user} from '../../../reducers/users';

const singleEntityReducers = {
  album,
  artist,
  conversation,
  group,
  message,
  playlist,
  playlistTrack,
  queueTrack,
  session,
  track,
  user,
};

/**
 * Adds entities to a single node of the entities state
 * 
 * @function addEntityType
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                     The Redux state for a single node in the entities state
 * @param   {object}   action                    The Redux action
 * @param   {string}   action.type               The type of Redux action
 * @param   {object[]} action.items              The items to add to the single entities node
 * @param   {string}   action.entityType         The type of entities to add
 * @param   {boolean}  [action.refreshing=false] Whether the current user is refreshing the entities given
 * @param   {object}   action.entities           The entities to add
 * @param   {object}   [entities.albums]         The album entities to add
 * @param   {object}   [entities.artists]        The artist entities to add
 * @param   {object}   [entities.conversations]  The conversation entities to add
 * @param   {object}   [entities.groups]         The group entities to add
 * @param   {object}   [entities.messages]       The message entities to add
 * @param   {object}   [entities.playlists]      The playlist entities to add
 * @param   {object}   [entities.playlistTracks] The playlist track entities to add
 * @param   {object}   [entities.queueTracks]    The queue track entities to add
 * @param   {object}   [entities.sessions]       The session entities to add
 * @param   {object}   [entities.tracks]         The track entities to add
 * @param   {object}   [entities.users]          The user entities to add
 * 
 * @returns {object}                             The single entities node with the new entities added
 */
export function addEntityType(state, action) {
  const {allIDs: oldIDs, byID} = state;
  const {items, entityType, refreshing} = action;
  const itemIDs = items.map(item => item.id);
  const allIDs = [...oldIDs, ...itemIDs].filter((el, i, arr) => i === arr.indexOf(el));
  const entitiesToAdd = items.reduce((obj, item) => {
    const entity = byID[item.id];
    const func = singleEntityReducers[entityType.slice(0, -1)];
    
    if (typeof func === 'function') {
      const addedEntity = func(entity, {...action, item, refreshing});
      return updateObject(obj, {[item.id]: addedEntity});
    }

    return obj;
  }, {});

  return updateObject(state, {
    allIDs,
    total: allIDs.length,
    byID: updateObject(byID, entitiesToAdd),
  });
}

/**
 * Adds entities to the Redux state
 * 
 * @function addEntities
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object} state                     The Redux state
 * @param   {object} action                    The Redux action
 * @param   {string} action.type               The type of Redux action
 * @param   {object} action.entities           The entities to add
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
 * @returns {object}                           The state with the entities added
 */
export function addEntities(state, action) {
  const {entities} = action;

  let newState = {};

  const entityTypes = Object.keys(entities);
  const typesToCopy = Object.keys(state).filter(key => !entityTypes.includes(key));

  entityTypes.forEach(entityType => {
    const newAction = {...action, entityType, items: Object.values(entities[entityType])};
    newState = updateObject(newState, {
      [entityType]: singleEntityType(state[entityType], newAction),
    });
  });

  typesToCopy.forEach(type => {
    newState = updateObject(newState, {[type]: {...state[type]}});
  });

  return newState;
}