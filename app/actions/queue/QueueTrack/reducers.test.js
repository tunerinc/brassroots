'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from './actions';

describe('queue track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle QUEUE_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.queueTrackRequest()))
      .toStrictEqual({...initialState, queueing: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.queueTrackRequest(),
      ),
    )
      .toStrictEqual({...initialState, queueing: true});
  });

  it('should handle QUEUE_TRACK_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, queueing: true},
        actions.queueTrackSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle QUEUE_TRACK_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, queueing: true},
        actions.queueTrackFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});