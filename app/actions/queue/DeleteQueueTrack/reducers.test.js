'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from './actions';

describe('delete queue track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle DELETE_QUEUE_TRACK_REQUEST', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';

    expect(reducer(initialState, actions.deleteQueueTrackRequest(queueIDOne)))
      .toStrictEqual({...initialState, deleting: [queueIDOne]});

    expect(
      reducer(
        {...initialState, failed: [queueIDOne], error: new Error('error')},
        actions.deleteQueueTrackRequest(queueIDOne),
      ),
    )
      .toStrictEqual({...initialState, deleting: [queueIDOne]});

    expect(
      reducer(
        {...initialState, failed: [queueIDOne], error: new Error('error')},
        actions.deleteQueueTrackRequest(queueIDTwo),
      ),
    )
      .toStrictEqual({...initialState, deleting: [queueIDTwo], failed: [queueIDOne]});

    expect(
      reducer(
        {...initialState, deleting: [queueIDOne]},
        actions.deleteQueueTrackRequest(queueIDTwo),
      ),
    )
      .toStrictEqual({...initialState, deleting: [queueIDOne, queueIDTwo]});
  });

  it('should handle DELETE_QUEUE_TRACK_SUCCESS', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';

    expect(
      reducer(
        {...initialState, deleting: [queueIDOne]},
        actions.deleteQueueTrackSuccess(queueIDOne),
      ),
    )
      .toStrictEqual(initialState);

    expect(
      reducer(
        {...initialState, deleting: [queueIDOne, queueIDTwo]},
        actions.deleteQueueTrackSuccess(queueIDTwo),
      ),
    )
      .toStrictEqual({...initialState, deleting: [queueIDOne]});
  });

  it('should handle DELETE_QUEUE_TRACK_FAILURE', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, deleting: [queueIDOne]},
        actions.deleteQueueTrackFailure(queueIDOne, error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: [queueIDOne]});

    expect(
      reducer(
        {...initialState, deleting: [queueIDOne, queueIDTwo]},
        actions.deleteQueueTrackFailure(queueIDTwo, error),
      ),
    )
      .toStrictEqual({...initialState, error, deleting: [queueIDOne], failed: [queueIDTwo]});

    expect(
      reducer(
        {...initialState, deleting: [queueIDOne], failed: [queueIDTwo]},
        actions.deleteQueueTrackFailure(queueIDOne, error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: [queueIDTwo, queueIDOne]});
  });
});