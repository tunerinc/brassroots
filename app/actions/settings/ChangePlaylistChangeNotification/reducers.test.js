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

describe('change playlist change notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['playlist change']};
    const expectedState: State = {...initialState, saving: ['playlist change']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['playlist change']};
    const playlistChange: boolean = true;
    const expectedState: State = {...initialState, notify: {...initialState.notify, playlistChange}};
    expect(reducer(state, actions.success(playlistChange))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['playlist change']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['playlist change']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});