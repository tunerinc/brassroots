'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/settings';
import * as actions from './actions';

describe('change session chat notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_SESSION_CHAT_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['session chat']};
    const expectedState: State = {...initialState, saving: ['session chat']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SESSION_CHAT_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['session chat']};
    const chat: string = 'foo';
    const expectedState: State = {...initialState, notify: {...initialState.notify, chat}};
    expect(reducer(state, actions.success(chat))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SESSION_CHAT_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['session chat']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['session chat']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});