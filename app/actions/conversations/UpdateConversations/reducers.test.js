'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/conversations';
import * as actions from '../UpdateConversations';

describe('update conversations reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_CONVERSATIONS', () => {
    const newConversation = {text: 'foo', users: ['foo']};
    const updates: State = {newConversation};
    const expectedState: State = {...initialState, newConversation};
    expect(reducer(initialState, actions.updateConversations(updates))).toStrictEqual(expectedState);
  });
});