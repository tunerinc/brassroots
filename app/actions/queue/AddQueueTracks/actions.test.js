'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddQueueTracks';
import * as types from '../types';
import {
  type QueueTrack,
  type Action,
} from '../../../reducers/queue';

describe('add queue tracks action creator', () => {
  it('creates action to add queue track to Redux', () => {
    const tracks: {
      +[id: string]: QueueTrack,
    } = {
      'foo': {
        id: 'foo',
        trackID: 'foo',
        userID: 'foo',
        totalLikes: 0,
        liked: false,
        seconds: 0,
        nanoseconds: 0,
      },
      'bar': {
        id: 'bar',
        trackID: 'bar',
        userID: 'bar',
        totalLikes: 0,
        liked: false,
        seconds: 0,
        nanoseconds: 0,
      },
    };

    const expectedAction: Action = {
      type: types.ADD_QUEUE_TRACKS,
      tracks,
    };

    expect(actions.addQueueTracks(tracks)).toStrictEqual(expectedAction);
  });
});