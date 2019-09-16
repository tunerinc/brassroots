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

describe('send chat message reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles SEND_CHAT_MESSAGE_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['chat']};
    const expectedState: State = {...initialState, fetching: ['message']};
    const expectedStateTwo: State = {...initialState, fetching: ['chat', 'message']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles SEND_CHAT_MESSAGE_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['message']};
    const stateTwo: State = {...initialState, fetching: ['chat', 'message']};
    const expectedState: State = {...initialState, fetching: ['chat']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles SEND_CHAT_MESSAGE_FAILURE', () => {
    const state: State = {...initialState, fetching: ['message']};
    const stateTwo: State = {...initialState, fetching: ['chat', 'message']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['chat']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});