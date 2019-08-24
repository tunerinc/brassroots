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

describe('change message preference reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_MESSAGE_PREFERENCE_REQUEST', () => {
    const state: State = {...initialState, failed: ['message pref']};
    const expectedState: State = {...initialState, saving: ['message pref']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_MESSAGE_PREFERENCE_SUCCESS', () => {
    const state: State = {...initialState, saving: ['message pref']};
    const message: string = 'foo';
    const expectedState: State = {...initialState, preference: {...initialState.preference, message}};
    expect(reducer(state, actions.success(message))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_MESSAGE_PREFERENCE_FAILURE', () => {
    const state: State = {...initialState, saving: ['message pref']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['message pref']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});