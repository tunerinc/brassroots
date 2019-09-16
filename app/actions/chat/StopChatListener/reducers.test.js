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

const unsubscribe: () => any = () => {return};

describe('stop chat listener reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles STOP_CHAT_LISTENER_REQUEST', () => {
    const state: State = {...initialState, unsubscribe, fetching: ['chat']};
    const stateTwo: State = {...state, fetching: ['message', 'chat']};
    expect(reducer(state, actions.request())).toStrictEqual(state);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(stateTwo);
  });

  it('handles STOP_CHAT_LISTENER_SUCCESS', () => {
    const state: State = {...initialState, unsubscribe, fetching: ['chat']};
    const stateTwo: State = {...state, fetching: ['message', 'chat']};
    const expectedState: State = {...initialState, fetching: ['message']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles STOP_CHAT_LISTENER_FAILURE', () => {
    const state: State = {...initialState, unsubscribe, fetching: ['chat']};;
    const stateTwo: State = {...initialState, unsubscribe, fetching: ['message', 'chat']};;
    const error: Error = new Error('error');
    const expectedState: State = {...state, error};
    const expectedStateTwo: State = {...stateTwo, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});