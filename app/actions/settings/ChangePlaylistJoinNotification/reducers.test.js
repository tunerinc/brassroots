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

describe('change playlist join notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['playlist join']};
    const expectedState: State = {...initialState, saving: ['playlist join']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['playlist join']};
    const playlistJoin: boolean = false;
    const expectedState: State = {...initialState, notify: {...initialState.notify, playlistJoin}};
    expect(reducer(state, actions.success(playlistJoin))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['playlist join']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['playlist join']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});