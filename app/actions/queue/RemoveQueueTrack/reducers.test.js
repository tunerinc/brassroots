'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {initialState} from '../../../reducers/queue';
import * as actions from '../RemoveQueueTrack';

describe('remove queue track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle REMOVE_QUEUE_TRACK', () => {
    const queueID: string = 'foo';
    const removeTrack: boolean = true;

    expect(
      reducer(
        {
          ...initialState,
          userQueue: ['foo', 'bar', 'xyz'],
          totalQueue: 3,
          queueByID: {
            'foo': {
              id: 'foo',
              trackID: 'foo',
              userID: 'foo',
              totalLikes: 0,
              liked: false,
            },
            'bar': {
              id: 'bar',
              trackID: 'bar',
              userID: 'bar',
              totalLikes: 0,
              liked: false,
            },
            'xyz': {
              id: 'xyz',
              trackID: 'xyz',
              userID: 'xyz',
              totalLikes: 0,
              liked: false,
            },
          },
        },
        actions.removeQueueTrack(queueID),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          userQueue: ['bar', 'xyz'],
          totalQueue: 2,
          lastUpdated: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          queueByID: {
            'foo': {
              id: 'foo',
              trackID: 'foo',
              userID: 'foo',
              totalLikes: 0,
              liked: false,
            },
            'bar': {
              id: 'bar',
              trackID: 'bar',
              userID: 'bar',
              totalLikes: 0,
              liked: false,
            },
            'xyz': {
              id: 'xyz',
              trackID: 'xyz',
              userID: 'xyz',
              totalLikes: 0,
              liked: false,
            },
          },
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          userQueue: ['foo', 'bar', 'xyz'],
          totalQueue: 3,
          queueByID: {
            'foo': {
              id: 'foo',
              trackID: 'foo',
              userID: 'foo',
              totalLikes: 0,
              liked: false,
            },
            'bar': {
              id: 'bar',
              trackID: 'bar',
              userID: 'bar',
              totalLikes: 0,
              liked: false,
            },
            'xyz': {
              id: 'xyz',
              trackID: 'xyz',
              userID: 'xyz',
              totalLikes: 0,
              liked: false,
            },
          },
        },
        actions.removeQueueTrack(queueID, removeTrack),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          userQueue: ['bar', 'xyz'],
          totalQueue: 2,
          lastUpdated: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
          queueByID: {
            'bar': {
              id: 'bar',
              trackID: 'bar',
              userID: 'bar',
              totalLikes: 0,
              liked: false,
            },
            'xyz': {
              id: 'xyz',
              trackID: 'xyz',
              userID: 'xyz',
              totalLikes: 0,
              liked: false,
            },
          },
        },
      );
  });
});