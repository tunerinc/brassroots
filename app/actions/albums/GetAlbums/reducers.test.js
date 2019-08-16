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
    const refreshing: boolean = true;
    const expectedState: State = {...initialState, fetching: ['albums']};
    const refreshState: State = {...expectedState, refreshing};
    expect(reducer(initialState, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(initialState, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(state, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(state, actions.request(!refreshing))).toStrictEqual(expectedState);
  });

  it('handles GET_ALBUMS_SUCCESS', () => {
    const userAlbums: Array<string> = ['bar', 'xyz'];
    const totalUserAlbums: number = 5;
    const replace: boolean = true;
    const state: State = {...initialState, fetching: ['albums']};
    const albumState: State = {...state, userAlbums: ['xyz']};
    const refreshState: State = {...albumState, refreshing: true};
    const expectedState: State = {...initialState, totalUserAlbums, userAlbums};
    const albumExpectedState: State = {...expectedState, userAlbums: ['xyz', ...userAlbums]};

    expect(reducer(state, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(expectedState);
    
    expect(reducer(albumState, actions.success(userAlbums, totalUserAlbums, replace)))
      .toStrictEqual(expectedState);

    expect(reducer(refreshState, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(expectedState);

    expect(reducer(albumState, actions.success(userAlbums, totalUserAlbums)))
      .toStrictEqual(albumExpectedState);
  });

  it('handles GET_ALBUMS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['albums']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});