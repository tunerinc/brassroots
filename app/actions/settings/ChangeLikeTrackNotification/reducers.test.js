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

describe('change like track notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['liked track']};
    const expectedState: State = {...initialState, saving: ['liked track']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_LIKE_TRACK_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['liked track']};
    const likedTrack: boolean = false;
    const expectedState: State = {...initialState, notify: {...initialState.notify, likedTrack}};
    expect(reducer(state, actions.success(likedTrack))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['liked track']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['liked track']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});