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

describe('change playlist preference reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_PLAYLIST_PREFERENCE_REQUEST', () => {
    const state: State = {...initialState, failed: ['playlist pref']};
    const expectedState: State = {...initialState, saving: ['playlist pref']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_PLAYLIST_PREFERENCE_SUCCESS', () => {
    const state: State = {...initialState, saving: ['playlist pref']};
    const playlist: string = 'foo';
    const expectedState: State = {...initialState, preference: {...initialState.preference, playlist}};
    expect(reducer(state, actions.success(playlist))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_PLAYLIST_PREFERENCE_FAILURE', () => {
    const state: State = {...initialState, saving: ['playlist pref']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['playlist pref']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});