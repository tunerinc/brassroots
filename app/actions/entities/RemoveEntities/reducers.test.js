'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
  type Entity,
} from '../../../reducers/entities';
import {
  removeEntities,
  type Entities,
} from '../RemoveEntities';

describe('remove entities reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles REMOVE_ENTITIES', () => {
    const id: string = 'foo';
    const obj: Entity = {allIDs: [id], total: 1, byID: {[id]: true}};
    const entities: Entities = {albums: {[id]: true}, tracks: {[id]: true}, users: {[id]: true}};
    const state: State = {...initialState, albums: {...obj}, tracks: {...obj}, users: {...obj}};
    const sessionState: State = {...state, sessions: {...obj}};
    const expectedSessionState: State = {...initialState, sessions: {...obj}};
    expect(reducer(state, removeEntities(entities))).toStrictEqual(initialState);
    expect(reducer(sessionState, removeEntities(entities))).toStrictEqual(expectedSessionState);
  });
});