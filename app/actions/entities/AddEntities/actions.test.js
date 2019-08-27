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
import {type Artist} from '../../../reducers/albums';

type Entities = {[type: string]: {[id: string]: EntityType}};

describe('add entities action creator', () => {
  it('creates action to add entities', () => {
    const artists: Array<Artist> = [{id: 'foo', name: 'foo'}];
    const userTracks: Array<string> = ['foo'];
    const tracks: Array<string> = ['foo'];
    const entities = {
      albums: {
        'foo': {
          artists,
          userTracks,
          tracks,
          id: 'foo',
          name: 'foo bar',
          small: 'foo',
          medium: 'foo',
          large: 'foo',
        },
      },
      tracks: {
        'foo': {
          artists,
          id: 'foo',
          albumID: 'foo',
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