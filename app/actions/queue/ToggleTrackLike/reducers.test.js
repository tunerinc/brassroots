'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/queue';
import * as actions from './actions';

describe('toggle track like reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle TOGGLE_TRACK_LIKE_REQUEST', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';

    expect(reducer(initialState, actions.toggleTrackLikeRequest(queueIDOne)))
      .toStrictEqual({...initialState, liking: [queueIDOne]});

    expect(
      reducer(
        {...initialState, failed: [queueIDOne], error: new Error('error')},
        actions.toggleTrackLikeRequest(queueIDOne),
      ),
    )
      .toStrictEqual({...initialState, liking: [queueIDOne]});

    expect(
      reducer(
        {...initialState, failed: [queueIDOne], error: new Error('error')},
        actions.toggleTrackLikeRequest(queueIDTwo),
      ),
    )
      .toStrictEqual({...initialState, liking: [queueIDTwo], failed: [queueIDOne]});

    expect(
      reducer(
        {...initialState, liking: [queueIDOne]},
        actions.toggleTrackLikeRequest(queueIDTwo),
      ),
    )
      .toStrictEqual({...initialState, liking: [queueIDOne, queueIDTwo]});
  });

  it('should handle TOGGLE_TRACK_LIKE_SUCCESS', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';

    expect(
      reducer(
        {...initialState, liking: [queueIDOne]},
        actions.toggleTrackLikeSuccess(queueIDOne),
      ),
    )
      .toStrictEqual(initialState);

    expect(
      reducer(
        {...initialState, liking: [queueIDOne, queueIDTwo]},
        actions.toggleTrackLikeSuccess(queueIDTwo),
      ),
    )
      .toStrictEqual({...initialState, liking: [queueIDOne]});
  });

  it('should handle TOGGLE_TRACK_LIKE_FAILURE', () => {
    const queueIDOne: string = 'foo';
    const queueIDTwo: string = 'bar';
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, liking: [queueIDOne]},
        actions.toggleTrackLikeFailure(queueIDOne, error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: [queueIDOne]});

    expect(
      reducer(
        {...initialState, liking: [queueIDOne, queueIDTwo]},
        actions.toggleTrackLikeFailure(queueIDTwo, error),
      ),
    )
      .toStrictEqual({...initialState, error, liking: [queueIDOne], failed: [queueIDTwo]});

    expect(
      reducer(
        {...initialState, liking: [queueIDOne], failed: [queueIDTwo]},
        actions.toggleTrackLikeFailure(queueIDOne, error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: [queueIDTwo, queueIDOne]});
  });
});