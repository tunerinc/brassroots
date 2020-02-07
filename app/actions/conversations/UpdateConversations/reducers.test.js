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
    const updates: State = {newConversation: {text: 'foo', users: ['foo']}};
    const newConversation = {...initialState.newConversation, text: 'foo', users: ['foo']};
    const expectedState: State = {...initialState, newConversation};
    expect(reducer(initialState, actions.updateConversations(updates))).toStrictEqual(expectedState);
  });
});