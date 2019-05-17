'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('toggle mute reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle TOGGLE_MUTE_REQUEST', () => {
    expect(reducer(initialState, actions.toggleMuteRequest()))
      .toStrictEqual({...initialState, muting: true});
  });

  it('should handle TOGGLE_MUTE_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, muting: true},
        actions.toggleMuteSuccess(true),
      ),
    )
      .toStrictEqual({...initialState, muting: false, muted: true});

    expect(
      reducer(
        {...initialState, muting: true, muted: true},
        actions.toggleMuteSuccess(false),
      ),
    )
      .toStrictEqual({...initialState, muting: false});
  });

  it('should handle TOGGLE_MUTE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, muting: true},
        actions.toggleMuteFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, muting: false});
  });
});