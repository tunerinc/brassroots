'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from './actions';

describe('get user queue reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_USER_QUEUE_REQUEST', () => {
    expect(reducer(initialState, actions.getUserQueueRequest()))
      .toStrictEqual({...initialState, fetchingQueue: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getUserQueueRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingQueue: true});
  });

  it('should handle GET_USER_QUEUE_SUCCESS', () => {
    const userQueue: Array<string> = ['foo', 'bar'];
    const unsubscribe: () => void = () => {return};

    expect(
      reducer(
        {
          ...initialState,
          fetchingQueue: true,
          queueByID: {
            foo: {
              seconds: 0,
              nanoseconds: 0,
            },
            bar: {
              seconds: 0,
              nanoseconds: 0,
            },
          },
        },
        actions.getUserQueueSuccess(userQueue, unsubscribe),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          unsubscribe,
          userQueue: ['foo', 'bar'],
          queueByID: {
            foo: {
              seconds: 0,
              nanoseconds: 0,
            },
            bar: {
              seconds: 0,
              nanoseconds: 0,
            },
          },
        },
      );
  });

  it('should handle GET_USER_QUEUE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingQueue: true},
        actions.getUserQueueFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});