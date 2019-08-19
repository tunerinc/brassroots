'use strict';

/**
 * @module AddEntitiesReducers
 */

import updateObject from '../../../utils/updateObject';
import {singleEntityType} from '../../../reducers/entities';
import {singleAlbum} from '../../../reducers/albums';
import {singleArtist} from '../../../reducers/artists';
import {singleConversation, singleMessage} from '../../../reducers/conversations';
import {singleGroup} from '../../../reducers/groups';
import {singlePlaylist, singlePlaylistTrack} from '../../../reducers/playlists';
import {singleQueueTrack} from '../../../reducers/queue';
import {singleSession} from '../../../reducers/sessions';
import {singleTrack} from '../../../reducers/tracks';
import {singleUser} from '../../../reducers/users';

const singleEntityReducers = {
  singleAlbum,
  singleArtist,
  singleConversation,
  singleGroup,
  singleMessage,
  singlePlaylist,
  singlePlaylistTrack,
  singleQueueTrack,
  singleSession,
  singleTrack,
  singleUser,
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
  const {items, entityType} = action;
  const itemIDs = items.map(item => item.id);
  const allIDs = [...oldIDs, ...itemIDs].filter((el, i, arr) => i === arr.indexOf(el));
  const entitiesToAdd = items.reduce((obj, item) => {
    const entity = byID[item.id];
    const type = entityType.slice(0, -1);
    const name = `single${type.slice(0, 1).toUpperCase()}${type.slice(1).toLowerCase()}`;
    const func = singleEntityReducers[name];
    
    if (typeof func === 'function') {
      const addedEntity = func(entity, {...action, item});
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
    const newAction = {...action, entityType, items: Object.values(entities[entityType])}
    newState = updateObject(newState, {
      [entityType]: singleEntityType(state[entityType], newAction),
    });
  });

  typesToCopy.forEach(type => {
    newState = updateObject(newState, {[type]: {...state[type]}});
  });

  return newState;
}