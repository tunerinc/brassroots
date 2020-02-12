'use strict';

/**
 * @format
 * @flow
 */

import {
  removeEntities,
  type Entities,
} from '../RemoveEntities';
import * as types from '../types';
import {type Action} from '../../../reducers/entities';

describe('remove entities action creator', () => {
  it('creates action to remove entities', () => {
    const entities: Entities = {albums: {'foo': true}, tracks: {'foo': true}, users: {'foo': true}};
    const expectedAction: Action = {
      type: types.REMOVE_ENTITIES,
      entities,
    };

    expect(removeEntities(entities)).toStrictEqual(expectedAction);
  });
});