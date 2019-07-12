'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type QueueTrack,
} from '../../../reducers/queue';
import * as actions from '../AddQueueTracks';

describe('add queue tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_QUEUE_TRACKS', () => {
    const tracks: {
      +[id: string]: QueueTrack,
    } = {
      'foo': {
        id: 'foo',
        trackID: 'foo',
        userID: 'foo',
        totalLikes: 0,
        liked: false,
        timeAdded: {
          seconds: 0,
          nanoseconds: 0,
        },
      },
      'bar': {
        id: 'bar',
        trackID: 'bar',
        userID: 'bar',
        totalLikes: 0,
        liked: false,
        timeAdded: {
          seconds: 0,
          nanoseconds: 0,
        },
      },
    };

    expect(reducer(initialState, actions.addQueueTracks(tracks)))
      .toStrictEqual(
        {
          ...initialState,
          totalQueue: 2,
          queueByID: {...tracks},
        }
      );
  });
});