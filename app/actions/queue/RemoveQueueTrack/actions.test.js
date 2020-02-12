'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemoveQueueTrack';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('remove queue track action creator', () => {
  it('creates action to remove a queue track in a session', () => {
    const queueID: string = 'foo';
    const expectedAction: Action = {
      type: types.REMOVE_QUEUE_TRACK,
      queueID,
    };

    expect(actions.removeQueueTrack(queueID)).toStrictEqual(expectedAction);
  });
});