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
    const userConversations: Array<string> = ['foo'];
    const newConversation = {text: 'foo', users: ['foo']};
    const updates: State = {userConversations, newConversation};
    const emptyUpdates: State = {userConversations: []};
    const state: State = {...initialState, userConversations, totalUserConversations: 1};
    const expectedState: State = {
      ...initialState,
      userConversations,
      newConversation,
      totalUserConversations: 1,
    };

    expect(reducer(initialState, actions.updateConversations(updates))).toStrictEqual(expectedState);
    expect(reducer(state, actions.updateConversations(emptyUpdates))).toStrictEqual(initialState);
  });
});