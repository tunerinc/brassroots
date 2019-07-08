'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('seek position reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle SEEK_POSITION_REQUEST', () => {
    expect(reducer(initialState, actions.seekPositionRequest()))
      .toStrictEqual({...initialState, seeking: true});
  });

  it('should handle SEEK_POSITION_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, seeking: true},
        actions.seekPositionSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle SEEK_POSITION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, seeking: true},
        actions.seekPositionFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});