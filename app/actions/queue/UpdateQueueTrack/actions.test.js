'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateQueueTrack';
import * as types from '../types';
import {
  type Action,
  type Updates,
} from '../../../reducers/queue';

describe('update queue track action creator', () => {
  it('creates action to update a single queue track with new values', () => {
    const queueID: string = 'foo';
    const updates: Updates = {totalLikes: 1, changeLike: true};
    const expectedAction: Action = {
      type: types.UPDATE_QUEUE_TRACK,
      queueID,
      updates,
    };

    expect(actions.updateQueueTrack(queueID, updates)).toStrictEqual(expectedAction);
  });
});