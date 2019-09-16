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

describe('change nearby session notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['nearby session']};
    const expectedState: State = {...initialState, saving: ['nearby session']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['nearby session']};
    const nearbySession: string = 'foo';
    const expectedState: State = {...initialState, notify: {...initialState.notify, nearbySession}};
    expect(reducer(state, actions.success(nearbySession))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['nearby session']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['nearby session']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});