'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/chat';
import * as actions from '../UpdateChat';

describe('update chat reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_CHAT', () => {
    const updates: State = {message: 'foo'};
    const expectedState: State = {...initialState, message: 'foo'};
    expect(reducer(initialState, actions.updateChat(updates))).toStrictEqual(expectedState);
  });
});