'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {
  initialState,
  type State,
  type QueueTrack,
} from '../../../reducers/queue';
import * as actions from '../RemoveQueueTrack';

describe('remove queue track reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles REMOVE_QUEUE_TRACK', () => {
    const queueID: string = 'foo';
    const trackOne: QueueTrack = {id: 'foo', seconds: 0, nanoseconds: 0};
    const trackTwo: QueueTrack = {id: 'bar', seconds: 0, nanoseconds: 0};
    const trackThree: QueueTrack = {id: 'xyz', seconds: 0, nanoseconds: 0};
    const userQueue: Array<QueueTrack> = [trackOne, trackTwo, trackThree];
    const newQueue: Array<QueueTrack> = [trackTwo, trackThree];
    const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');
    const state: State = {...initialState, userQueue, totalUserQueue: 3};
    const newState: State = {...initialState, lastUpdated, userQueue: newQueue, totalUserQueue: 2};
    expect(reducer(state, actions.removeQueueTrack(queueID))).toStrictEqual(newState);
  });
});