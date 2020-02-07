'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
  type QueueTrack,
} from '../../../reducers/queue';
import * as actions from '../ResetQueue';

describe('reset queue reducer', () => {
  it('handles RESET_QUEUE', () => {
    const track: QueueTrack = {id: 'foo', seconds: 0, nanoseconds: 0};
    const state: State = {...initialState, userQueue: [track], contextQueue: ['foo']};
    expect(reducer(state, actions.resetQueue())).toStrictEqual(initialState);
  });
});