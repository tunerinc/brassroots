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

describe('get context queue reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_CONTEXT_QUEUE_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingContext: true};
    expect(reducer(initialState, actions.getContextQueueRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getContextQueueRequest())).toStrictEqual(expectedState);
  });

  it('should handle GET_CONTEXT_QUEUE_SUCCESS', () => {
    const queueOne: Array<string> = ['xyz'];
    const queueTwo: Array<string> = ['bar', 'xyz'];
    const queueThree: Array<string> = ['foo', 'bar', 'xyz'];
    const state: State = {...initialState, fetchingContext: true};

    expect(
      reducer(
        {...state, contextQueue: queueThree},
        actions.getContextQueueSuccess(),
      ),
    )
      .toStrictEqual({...initialState, contextQueue: queueThree});

    expect(
      reducer(
        {...state, contextQueue: ['foo', 'bar']},
        actions.getContextQueueSuccess(queueOne),
      ),
    )
      .toStrictEqual({...initialState, contextQueue: queueThree});

    expect(
      reducer(
        {...state, contextQueue: ['foo']},
        actions.getContextQueueSuccess(queueTwo),
      ),
    )
      .toStrictEqual({...initialState, contextQueue: queueThree});

    expect(reducer(state, actions.getContextQueueSuccess(queueThree)))
      .toStrictEqual({...initialState, contextQueue: queueThree});
  });

  it('should handle GET_CONTEXT_QUEUE_FAILURE', () => {
    const state: State = {...initialState, fetchingContext: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getContextQueueFailure(error))).toStrictEqual(expectedState);
  });
});