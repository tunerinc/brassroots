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
    const refreshing: boolean = true;
    const artists: Array<Artist> = [{id: 'foo', name: 'foo'}];
    const userTracks: Array<string> = ['foo'];
    const tracks: Array<string> = ['foo'];
    const entities = {
      albums: {
        'foo': {
          userTracks,
          tracks,
          artists,
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
          album: {
            artists,
            id: 'foo',
            name: 'foo bar',
            small: 'foo',
            medium: 'foo',
            large: 'foo',
          },
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
      refreshing: false,
    };

    const expectedRefresh: Action = {...expectedAction, refreshing};

    expect(actions.addEntities(entities)).toStrictEqual(expectedAction);
    expect(actions.addEntities(entities, refreshing)).toStrictEqual(expectedRefresh);
  });
});