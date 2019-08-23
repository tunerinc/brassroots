'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/albums';
import * as actions from './actions';

describe('get albums reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ALBUMS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['topTracks']};
    const refreshing: boolean = true;
    const expectedState: State = {...initialState, fetching: ['albums']};
    const expectedStateTwo: State = {...initialState, fetching: ['topTracks', 'albums']};
    const refreshState: State = {...expectedState, refreshing};
    const refreshStateTwo: State = {...expectedStateTwo, refreshing};
    expect(reducer(initialState, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(initialState, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(state, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(state, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request(refreshing))).toStrictEqual(refreshStateTwo);
    expect(reducer(stateTwo, actions.request(!refreshing))).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_ALBUMS_SUCCESS', () => {
    const userAlbums: Array<string> = ['bar', 'xyz'];
    const totalUserAlbums: number = 5;
    const replace: boolean = true;
    const state: State = {...initialState, fetching: ['albums']};
    const stateTwo: State = {...initialState, fetching: ['albums', 'topTracks']};
    const albumState: State = {...state, userAlbums: ['xyz']};
    const albumStateTwo: State = {...albumState, fetching: ['topTracks']};
    const refreshState: State = {...albumState, refreshing: true};
    const refreshStateTwo: State = {...albumStateTwo, refreshing: true};
    const expectedState: State = {...initialState, totalUserAlbums, userAlbums};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    const albumExpectedState: State = {...expectedState, userAlbums: ['xyz', ...userAlbums]};
    const albumExpectedStateTwo: State = {...albumExpectedState, fetching: ['topTracks']};

    expect(reducer(state, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(expectedState);

    expect(reducer(stateTwo, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(expectedStateTwo);
    
    expect(reducer(albumState, actions.success(userAlbums, totalUserAlbums, replace)))
      .toStrictEqual(expectedState);

      expect(reducer(albumStateTwo, actions.success(userAlbums, totalUserAlbums, replace)))
      .toStrictEqual(expectedStateTwo);

    expect(reducer(refreshState, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(expectedState);

    expect(reducer(refreshStateTwo, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(expectedStateTwo);

    expect(reducer(albumState, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(albumExpectedState);

    expect(reducer(albumStateTwo, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(albumExpectedStateTwo);
  });

  it('handles GET_ALBUMS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['albums']};
    const stateTwo: State = {...initialState, fetching: ['albums', 'topTracks']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});