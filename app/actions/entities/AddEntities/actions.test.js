'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddEntities';
import * as types from '../types';
import {
  type Action,
  type EntityType,
} from '../../../reducers/entities';

type Entities = {[type: string]: EntityType};

describe('add entities action creator', () => {
  it('creates action to add entities', () => {
    const entities: Entities = {
      albums: {
        'foo': {
          id: 'foo',
          name: 'foo bar',
          artists: [{id: 'foo', name: 'foo'}],
          small: 'foo',
          medium: 'foo',
          large: 'foo',
          userTracks: ['foo'],
          tracks: ['foo'],
        },
      },
      tracks: {
        'foo': {
          id: 'foo',
          albumID: 'foo',
          artists: [{id: 'foo', name: 'foo'}],
          name: 'foo',
          trackNumber: 1,
        },
      },
      users: {
        'foo': {
          id: 'foo',
          displayName: 'foo',
          profileImage: 'foo',
        },
      },
    };

    const expectedAction: Action = {
      type: types.ADD_ENTITIES,
      entities,
    };

    expect(actions.addEntities(entities)).toStrictEqual(expectedAction);
  });
});