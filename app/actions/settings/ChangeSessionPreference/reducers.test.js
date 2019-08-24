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

describe('change session preference reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_SESSION_PREFERENCE_REQUEST', () => {
    const state: State = {...initialState, failed: ['session pref']};
    const expectedState: State = {...initialState, saving: ['session pref']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SESSION_PREFERENCE_SUCCESS', () => {
    const state: State = {...initialState, saving: ['session pref']};
    const session: string = 'foo';
    const expectedState: State = {...initialState, preference: {...initialState.preference, session}};
    expect(reducer(state, actions.success(session))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SESSION_PREFERENCE_FAILURE', () => {
    const state: State = {...initialState, saving: ['session pref']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['session pref']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});