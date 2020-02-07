'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateQueue';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/queue';

describe('update queue synchronous action creator', () => {
  it('creates action to update the queue state', () => {
    const updates: State = {context: {position: 1}};
    const expectedAction: Action = {
      type: types.UPDATE_QUEUE,
      updates,
    }

    expect(actions.updateQueue(updates)).toStrictEqual(expectedAction);
  });
});