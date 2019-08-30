'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/users';
import * as actions from '../ResetUsers';

describe('reset users reducer', () => {
  it('handles RESET_USERS', () => {
    const state: State = {...initialState, currentUserID: 'foo'};
    expect(reducer(state, actions.resetUsers())).toStrictEqual(initialState);
  });
});