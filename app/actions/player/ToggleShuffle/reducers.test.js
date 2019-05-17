'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('toggle shuffle reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle TOGGLE_SHUFFLE_REQUEST', () => {
    expect(reducer(initialState, actions.toggleShuffleRequest()))
      .toStrictEqual({...initialState, shuffling: true});
  });

  it('should handle TOGGLE_SHUFFLE_SUCCESS', () => {
    const shuffle: boolean = true;

    expect(
      reducer(
        {...initialState, shuffling: true},
        actions.toggleShuffleSuccess(shuffle),
      ),
    )
      .toStrictEqual({...initialState, shuffle, shuffling: false});

    expect(
      reducer(
        {...initialState, shuffle: true, shuffling: true},
        actions.toggleShuffleSuccess(!shuffle),
      ),
    )
      .toStrictEqual({...initialState, shuffling: false});
  });

  it('should handle TOGGLE_SHUFFLE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, shuffling: true},
        actions.toggleShuffleFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, shuffling: false});
  });
});