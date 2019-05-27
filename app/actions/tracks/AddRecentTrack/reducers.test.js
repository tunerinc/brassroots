'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from './actions';

describe('add recent track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_RECENT_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.addRecentTrackRequest()))
      .toStrictEqual({...initialState, addingRecent: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.addRecentTrackRequest(),
      ),
    )
      .toStrictEqual({...initialState, addingRecent: true});
  });

  it('should handle ADD_RECENT_TRACK_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, addingRecent: true},
        actions.addRecentTrackSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle ADD_RECENT_TRACK_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, addingRecent: true},
        actions.addRecentTrackFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});