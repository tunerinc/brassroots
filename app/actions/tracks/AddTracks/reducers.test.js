'use strict';

/**
 * @format
 * @flow
 */

import updateObject from '../../../utils/updateObject';
import * as actions from '../AddTracks';
import reducer, {
  initialState,
  type Track,
} from '../../../reducers/tracks';

describe('add tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_TRACKS', () => {
    const tracks: {
      [id: string]: Track,
    } = {
      foo: {
        id: 'foo',
        name: 'foo',
        albumID: 'foo',
        artists: [{
          id: 'foo',
          name: 'foo',
        }],
        trackNumber: 1,
        durationMS: 1,
      },
      bar: {
        id: 'bar',
        name: 'bar',
        albumID: 'bar',
        artists: [{
          id: 'foo',
          name: 'foo',
        }],
        trackNumber: 1,
        durationMS: 1,
      },
    };

    expect(reducer(initialState, actions.addTracks(tracks)))
      .toStrictEqual(
        {
          ...initialState,
          totalTracks: 2,
          lastUpdated: initialState.lastUpdated,
          tracksByID: Object.values(tracks).reduce((obj, track) => {
            if (track && typeof track.id === 'string') {
              return updateObject(obj, {
                [track.id]: {
                  ...track,
                  userPlays: 0,
                  totalPlays: 0,
                },
              });
            }
          }, {}),
        }
      );
  });
});