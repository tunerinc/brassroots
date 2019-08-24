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

describe('change sessions notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_SESSIONS_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['sessions']};
    const expectedState: State = {...initialState, saving: ['sessions']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SESSIONS_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['sessions']};
    const session: string = 'foo';
    const expectedState: State = {...initialState, notify: {...initialState.notify, session}};
    expect(reducer(state, actions.success(session))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SESSIONS_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['sessions']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['sessions']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});