'use strict';

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('auth user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle AUTHORIZE_USER_REQUEST', () => {
    expect(reducer(initialState, actions.authorizeUserRequest()))
      .toStrictEqual({...initialState, loggingIn: true});
  });

  it('should handle AUTHORIZE_USER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, loggingIn: true},
        actions.authorizeUserSuccess(),
        ),
    )
      .toStrictEqual({...initialState, loggingIn: false, loggedIn: true});
  });

  it('should handle AUTHORIZE_USER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, loggingIn: true},
        actions.authorizeUserFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, loggingIn: false});
  });
});