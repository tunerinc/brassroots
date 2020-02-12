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

const unsubscribe: () => void = () => {return};

describe('stop queue listener reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles STOP_QUEUE_LISTENER_REQUEST', () => {
    const state: State = {...initialState, unsubscribe};
    expect(reducer(state, actions.request())).toStrictEqual(state);
  });

  it('handles STOP_QUEUE_LISTENER_SUCCESS', () => {
    const state: State = {...initialState, unsubscribe};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles STOP_QUEUE_LISTENER_FAILURE', () => {
    const state: State = {...initialState, unsubscribe};
    const error: Error = new Error('error');
    const expectedState: State = {...state, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});