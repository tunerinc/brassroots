'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from './actions';

describe('get context queue reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_CONTEXT_QUEUE_REQUEST', () => {
    expect(reducer(initialState, actions.getContextQueueRequest()))
      .toStrictEqual({...initialState, fetchingContext: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getContextQueueRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingContext: true});
  });

  it('should handle GET_CONTEXT_QUEUE_SUCCESS', () => {
    const queueOne: Array<string> = ['xyz'];
    const queueTwo: Array<string> = ['bar', 'xyz'];
    const queueThree: Array<string> = ['foo', 'bar', 'xyz'];

    expect(
      reducer(
        {...initialState, fetchingContext: true, contextQueue: queueThree},
        actions.getContextQueueSuccess(),
      ),
    )
      .toStrictEqual({...initialState, contextQueue: queueThree});

    expect(
      reducer(
        {...initialState, fetchingContext: true, contextQueue: ['foo', 'bar']},
        actions.getContextQueueSuccess(queueOne),
      ),
    )
      .toStrictEqual({...initialState, contextQueue: queueThree});

    expect(
      reducer(
        {...initialState, fetchingContext: true, contextQueue: ['foo']},
        actions.getContextQueueSuccess(queueTwo),
      ),
    )
      .toStrictEqual({...initialState, contextQueue: queueThree});

    expect(
      reducer(
        {...initialState, fetchingContext: true},
        actions.getContextQueueSuccess(queueThree),
      ),
    )
      .toStrictEqual({...initialState, contextQueue: queueThree});
  });

  it('should handle GET_CONTEXT_QUEUE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingContext: true},
        actions.getContextQueueFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});