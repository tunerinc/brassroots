'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/player';
import * as actions from './actions';

describe('toggle repeat reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle TOGGLE_REPEAT_REQUEST', () => {
    expect(reducer(initialState, actions.toggleRepeatRequest()))
      .toStrictEqual({...initialState, repeating: true});
  });

  it('should handle TOGGLE_REPEAT_SUCCESS', () => {
    const repeat = true;

    expect(
      reducer(
        {...initialState, repeating: true},
        actions.toggleRepeatSuccess(repeat),
      ),
    )
      .toStrictEqual({...initialState, repeat, repeating: false});

    expect(
      reducer(
        {...initialState, repeat, repeating: true},
        actions.toggleRepeatSuccess(!repeat),
      ),
    )
      .toStrictEqual({...initialState, repeating: false});
  });

  it('should handle TOGGLE_REPEAT_FAILURE', () => {
    const error = new Error('error');

    expect(
      reducer(
        {...initialState, repeating: true},
        actions.toggleRepeatFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, repeating: false});
  });
});