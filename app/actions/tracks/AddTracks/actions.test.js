'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddTracks';
import * as types from '../types';
import {
  type Track,
  type Action,
} from '../../../reducers/tracks';

describe('add tracks action creator', () => {
  it('creates action to add tracks', () => {
    const tracks: {
      [id: string]: Track,
    } = {
      foo: {
        id: 'foo',
        albumID: 'foo',
        artists: [{
          id: 'foo',
          name: 'foo',
        }],
        name: 'foo',
        trackNumber: 1,
      },
      bar: {
        id: 'bar',
        albumID: 'bar',
        artists: [{
          id: 'bar',
          name: 'bar',
        }],
        name: 'bar',
        trackNumber: 1,
      },
    };
    const expectedAction: Action = {
      type: types.ADD_TRACKS,
      tracks,
    };
    
    expect(actions.addTracks(tracks)).toStrictEqual(expectedAction);
  });
});