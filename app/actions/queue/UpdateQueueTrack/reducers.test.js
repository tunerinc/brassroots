'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from '../UpdateQueueTrack';

describe('update queue track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle UPDATE_QUEUE_TRACK', () => {
    const queueID: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 0,
              liked: false,
            },
          },
        },
        actions.updateQueueTrack(queueID, {totalLikes: 1, changeLike: true}),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 1,
              liked: true,
            },
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 0,
              liked: false,
            },
          },
        },
        actions.updateQueueTrack(queueID, {totalLikes: 1}),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 1,
              liked: false,
            },
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 1,
              liked: false,
            },
          },
        },
        actions.updateQueueTrack(queueID, {changeLike: true}),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 1,
              liked: true,
            },
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 1,
              liked: true,
            },
          },
        },
        actions.updateQueueTrack(queueID, {changeLike: true}),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          queueByID: {
            [queueID]: {
              id: queueID,
              trackID: queueID,
              userID: queueID,
              totalLikes: 1,
              liked: false,
            },
          },
        }
      );
  });
});