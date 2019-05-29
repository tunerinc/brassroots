'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from './actions';

describe('get session queue reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_SESSION_QUEUE_REQUEST', () => {
    expect(reducer(initialState, actions.getSessionQueueRequest()))
      .toStrictEqual({...initialState, fetchingQueue: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getSessionQueueRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingQueue: true});
  });

  it('should handle GET_SESSION_QUEUE_SUCCESS', () => {
    const userQueue: Array<string> = ['foo', 'bar'];
    const unsubscribe: () => void = () => {return;};

    expect(
      reducer(
        {...initialState, fetchingQueue: true},
        actions.getSessionQueueSuccess(userQueue, unsubscribe),
      ),
    )
      .toStrictEqual({...initialState, unsubscribe, userQueue});
  });

  it('should handle GET_SESSION_QUEUE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingQueue: true},
        actions.getSessionQueueFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});