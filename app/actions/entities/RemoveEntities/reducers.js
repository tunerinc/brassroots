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
  type EntityType,
} from '../../../reducers/entities';

/**
 * 
 * @param {*} state 
 * @param {*} action 
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

  const updates = Array.isArray(ids) && typeof byID === 'object'
    ? {
      allIDs,
      total: allIDs.length,
      byID: allIDs.reduce((obj, key) => {
        return updateObject(obj, {
          [key]: {...byID[key]},
        });
      }, {}),
    }
    : {};

  return updateObject(state, updates);
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
export function removeEntities(
  state: State,
  action: Action,
): State {
  const {entities} = action;

  let newState: State = {};

  if (typeof entities === 'object' && typeof state === 'object') {
    const entityTypes: Array<string> = Object.keys(entities);
    const typesToKeep: Array<string> = Object.keys(state).filter(ley => !entityTypes.includes(ley));

    entityTypes.forEach(type => {
      if (typeof entities[type] === 'object') {
        newState = updateObject(newState, {
          [type]: removeEntity(state[type], {...action, ids: Object.keys(entities[type])}),
        });
      }
    });

    typesToKeep.forEach(type => {
      newState = updateObject(newState, {
        [type]: {...state[type]},
      });
    });
  }

  return newState;
}