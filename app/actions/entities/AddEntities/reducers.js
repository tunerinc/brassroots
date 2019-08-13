'use strict';

/**
 * @module AddEntitiesReducers
 */

import updateObject from '../../../utils/updateObject';

/**
 * Adds entities to a single node of the entities state
 * 
 * @function addEntity
 * 
 * @author Aldo Gonzalez <aldo@tunerinc.com>
 * 
 * @param   {object}   state                     The Redux state for a single node in the entities state
 * @param   {object}   action                    The Redux action
 * @param   {string}   action.type               The type of Redux action
 * @param   {object[]} action.items              The items to add to the single entities node
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
export function addEntity(state, action) {
  const {allIDs: oldIDs, byID} = state;
  const {items} = action;
  const itemIDs = Array.isArray(items) ? items.map(item => item.id) : [];
  const allIDs = [...oldIDs, ...itemIDs].filter((el, i, arr) => i === arr.indexOf(el));

  return updateObject(state, {
    allIDs,
    total: allIDs.length,
    byID: updateObject(byID, items.reduce((obj, item) => updateObject(obj, {[item.id]: item}), {})),
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

  const entityTypes: Array<string> = Object.keys(entities);
  const typesToCopy: Array<string> = Object.keys(state).filter(key => !entityTypes.includes(key));

  entityTypes.forEach(type => {
    const entity = addEntity(state[type], {...action, items: Object.values(entities[type])});
    newState = updateObject(newState, {[type]: {...entity}});
  });

  typesToCopy.forEach(type => {
    newState = updateObject(newState, {[type]: {...state[type]}});
  });

  return newState;
}