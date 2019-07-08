'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('log out reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle LOG_OUT_REQUEST', () => {
    expect(reducer(initialState, actions.logOutRequest()))
      .toStrictEqual({...initialState, loggingOut: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.logOutRequest(),
      ),
    )
      .toStrictEqual({...initialState, loggingOut: true});
  });

  it('should handle LOG_OUT_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, loggingOut: true},
        actions.logOutSuccess(),
      ),
    )
      .toStrictEqual({...initialState, initialized: true});
  });

  it('should handle LOG_OUT_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, loggingOut: true},
        actions.logOutFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});