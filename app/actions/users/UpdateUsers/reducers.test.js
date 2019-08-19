'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/users';
import * as actions from '../UpdateUsers';

describe('update users reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_USERS', () => {
    const updates: State = {currentUserID: 'foo'};
    const expectedState: State = {...initialState, currentUserID: 'foo'};
    expect(reducer(initialState, actions.updateUsers(updates))).toStrictEqual(expectedState);
  });
});