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
import * as actions from './actions';

describe('get user queue reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_USER_QUEUE_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetching: ['queue']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles GET_USER_QUEUE_SUCCESS', () => {
    const trackOne: QueueTrack = {id: 'foo', seconds: 0, nanoseconds: 0};
    const trackTwo: QueueTrack = {id: 'bar', seconds: 1, nanoseconds: 1};
    const userQueue: Array<QueueTrack> = [trackOne, trackTwo];
    const totalUserQueue: number = 2;
    const unsubscribe: () => void = () => {return};
    const state: State = {...initialState, fetching: ['queue']};
    const expectedState: State = {...state, unsubscribe, userQueue, totalUserQueue};
    expect(reducer(state, actions.success(userQueue, unsubscribe)))
      .toStrictEqual(expectedState);

      expect(
        reducer(
          state,
          actions.success(
            [
              {...trackOne, seconds: 1},
              {...trackTwo, seconds: 0},
            ],
            unsubscribe,
          ),
        ),
      )
        .toStrictEqual(
          {
            ...expectedState,
            userQueue: [
              {...trackTwo, seconds: 0},
              {...trackOne, seconds: 1},
            ],
          },
        );
  });

  it('handles GET_USER_QUEUE_FAILURE', () => {
    const state: State = {...initialState, fetching: ['queue']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});