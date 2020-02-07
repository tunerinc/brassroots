'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/queue';
import * as actions from './actions';

describe('queue track reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles QUEUE_TRACK_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, queueing: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles QUEUE_TRACK_SUCCESS', () => {
    const state: State = {...initialState, queueing: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles QUEUE_TRACK_FAILURE', () => {
    const state: State = {...initialState, queueing: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});