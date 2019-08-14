'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {
  initialState,
  lastUpdated,
  type State,
} from '../../../reducers/users';
import * as actions from '../AddCurrentUser';

describe('add current user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CURRENT_USER', () => {
    const currentUserID: string = 'foo';
    const state: State = {...initialState, lastUpdated, currentUserID};
    expect(reducer(initialState, actions.addCurrentUser(currentUserID))).toStrictEqual(state);
  });
});