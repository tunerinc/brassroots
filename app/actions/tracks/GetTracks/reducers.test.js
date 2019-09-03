'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/tracks';
import * as actions from './actions';

describe('get tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['mostPlayed']};
    const refreshing: boolean = true;
    const expectedState: State = {...initialState, fetching: ['tracks']};
    const expectedStateTwo: State = {...initialState, fetching: ['mostPlayed', 'tracks']};
    const refreshState: State = {...expectedState, refreshing};
    const refreshStateTwo: State = {...expectedStateTwo, refreshing};
    expect(reducer(initialState, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(initialState, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(state, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(state, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request(refreshing))).toStrictEqual(refreshStateTwo);
    expect(reducer(stateTwo, actions.request(!refreshing))).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_TRACKS_SUCCESS', () => {
    const userTracks: Array<string> = ['bar', 'xyz'];
    const totalUserTracks: number = 5;
    const replace: boolean = true;
    const state: State = {...initialState, fetching: ['tracks']};
    const stateTwo: State = {...initialState, fetching: ['tracks', 'mostPlayed']};
    const albumState: State = {...state, userTracks: ['xyz']};
    const albumStateTwo: State = {...albumState, fetching: ['mostPlayed']};
    const refreshState: State = {...albumState, refreshing: true};
    const refreshStateTwo: State = {...albumStateTwo, refreshing: true};
    const expectedState: State = {...initialState, totalUserTracks, userTracks};
    const expectedStateTwo: State = {...expectedState, fetching: ['mostPlayed']};
    const albumExpectedState: State = {...expectedState, userTracks: ['xyz', ...userTracks]};
    const albumExpectedStateTwo: State = {...albumExpectedState, fetching: ['mostPlayed']};

    expect(reducer(state, actions.success(userTracks, totalUserTracks)))
      .toStrictEqual(expectedState);

    expect(reducer(stateTwo, actions.success(userTracks, totalUserTracks)))
      .toStrictEqual(expectedStateTwo);
    
    expect(reducer(albumState, actions.success(userTracks, totalUserTracks, replace)))
      .toStrictEqual(expectedState);

      expect(reducer(albumStateTwo, actions.success(userTracks, totalUserTracks, replace)))
      .toStrictEqual(expectedStateTwo);

    expect(reducer(refreshState, actions.success(userTracks, totalUserTracks)))
      .toStrictEqual(expectedState);

    expect(reducer(refreshStateTwo, actions.success(userTracks, totalUserTracks)))
      .toStrictEqual(expectedStateTwo);

    expect(reducer(albumState, actions.success(userTracks, totalUserTracks)))
      .toStrictEqual(albumExpectedState);

    expect(reducer(albumStateTwo, actions.success(userTracks, totalUserTracks)))
      .toStrictEqual(albumExpectedStateTwo);
  });

  it('handles GET_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['tracks']};
    const stateTwo: State = {...initialState, fetching: ['tracks', 'mostPlayed']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['mostPlayed']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});