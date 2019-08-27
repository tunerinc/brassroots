'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlist tracks reducer', () => {
  it('creates initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_PLAYLIST_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['topMembers']};
    const refreshing: boolean = true;
    const expectedState: State = {...initialState, fetching: ['tracks']};
    const expectedStateTwo: State = {...initialState, fetching: ['topMembers', 'tracks']};
    const refreshState: State = {...expectedState, refreshing: ['tracks']};
    const refreshStateTwo: State = {...expectedStateTwo, refreshing: ['tracks']};
    expect(reducer(initialState, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(initialState, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(state, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(state, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request(refreshing))).toStrictEqual(refreshStateTwo);
    expect(reducer(stateTwo, actions.request(!refreshing))).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_PLAYLIST_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['tracks']};
    const stateTwo: State = {...initialState, fetching: ['tracks', 'topMembers']};
    const refreshState: State = {...state, refreshing: ['tracks']};
    const refreshStateTwo: State = {...stateTwo, refreshing: ['tracks']};
    const expectedState: State = {...initialState, fetching: ['topMembers']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
    expect(reducer(refreshState, actions.success())).toStrictEqual(initialState);
    expect(reducer(refreshStateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_PLAYLIST_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['tracks']};
    const stateTwo: State = {...initialState, fetching: ['tracks', 'topMembers']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topMembers']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});