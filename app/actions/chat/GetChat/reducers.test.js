'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/chat';
import * as actions from './actions';

describe('get chat reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_CHAT_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['media']};
    const expectedState: State = {...initialState, fetching: ['chat']};
    const expectedStateTwo: State = {...initialState, fetching: ['media', 'chat']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_CHAT_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['chat']};
    const stateTwo: State = {...initialState, fetching: ['media', 'chat']};
    const messages: Array<string> = ['foo', 'bar'];
    const currentChat: Array<string> = messages.reverse();
    const unsubscribe: () => void = () => {return;};
    const expectedState: State = {...initialState, currentChat, unsubscribe, totalCurrentChat: 2};
    const expectedStateTwo: State = {...expectedState, fetching: ['media']};
    expect(reducer(state, actions.success(messages, unsubscribe))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.success(messages, unsubscribe))).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_CHAT_FAILURE', () => {
    const state: State = {...initialState, fetching: ['chat']};
    const stateTwo: State = {...initialState, fetching: ['media', 'chat']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['media']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});