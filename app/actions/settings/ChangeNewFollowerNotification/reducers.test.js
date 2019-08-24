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

describe('change new follower notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_NEW_FOLLOWER_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['new follower']};
    const expectedState: State = {...initialState, saving: ['new follower']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_NEW_FOLLOWER_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['new follower']};
    const newFollower: boolean = false;
    const expectedState: State = {...initialState, notify: {...initialState.notify, newFollower}};
    expect(reducer(state, actions.success(newFollower))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_NEW_FOLLOWER_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['new follower']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['new follower']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});