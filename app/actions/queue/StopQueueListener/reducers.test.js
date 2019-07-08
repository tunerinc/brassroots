'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from './actions';

const unsubscribe = () => {
  return new Promise(res => res());
};

describe('stop queue listener reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle STOP_QUEUE_LISTENER_REQUEST', () => {
    expect(
      reducer(
        {...initialState, unsubscribe},
        actions.stopQueueListenerRequest(),
      ),
    )
      .toStrictEqual({...initialState, unsubscribe});
  });

  it('should handle STOP_QUEUE_LISTENER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, unsubscribe},
        actions.stopQueueListenerSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle STOP_QUEUE_LISTENER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, unsubscribe},
        actions.stopQueueListenerFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, unsubscribe});
  });
});