'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from './actions';

describe('change session mode reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_SESSION_MODE_REQUEST', () => {
    expect(reducer(initialState, actions.changeSessionModeRequest()))
      .toStrictEqual({...initialState, changingMode: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.changeSessionModeRequest(),
      ),
    )
      .toStrictEqual({...initialState, changingMode: true});
  });

  it('should handle CHANGE_SESSION_MODE_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, changingMode: true},
        actions.changeSessionModeSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle CHANGE_SESSION_MODE_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, changingMode: true},
        actions.changeSessionModeFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});