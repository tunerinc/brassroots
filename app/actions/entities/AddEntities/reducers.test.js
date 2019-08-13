'use strict';

import reducer, {
  singleState,
  initialState,
  type State,
  type EntityType,
} from '../../../reducers/entities';
import * as actions from '../AddEntities';
import {type Album} from '../../../reducers/albums';
import {
  type Track,
  type TrackArtist,
} from '../../../reducers/tracks';

describe('add entities reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles ADD_ENTITIES', () => {
    const artists: TrackArtist = [{id: 'foo', name: 'foo'}];
    const album: Album = {
      artists,
      id: 'foo',
      name: 'foo bar',
      small: 'foo',
      medium: 'foo',
      large: 'foo',
      userTracks: ['foo'],
      tracks: ['foo'],
    };

    const track: Track = {
      artists,
      id: 'foo',
      albumID: 'foo',
      name: 'foo',
      trackNumber: 1,
    };

    const entities: {[string]: EntityType} = {
      albums: {'foo': album},
      tracks: {
        'foo': track,
        'bar': {...track, id: 'bar'},
      },
    };

    expect(
      reducer(
        {
          ...initialState,
          tracks: {
            allIDs: ['xyz'],
            total: 1,
            byID: {
              'xyz': {...track, id: 'xyz'},
            },
          },
        },
        actions.addEntities(entities),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          albums: {
            allIDs: ['foo'],
            total: 1,
            byID: {'foo': album},
          },
          tracks: {
            allIDs: ['xyz', 'foo', 'bar'],
            total: 3,
            byID: {
              'foo': track,
              'bar': {...track, id: 'bar'},
              'xyz': {...track, id: 'xyz'},
            },
          },
        },
      );
  });
});