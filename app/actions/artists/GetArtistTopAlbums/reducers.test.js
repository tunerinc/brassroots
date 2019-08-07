'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Artist,
  type State,
} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artist top albums reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingAlbums: true};
    expect(reducer(initialState, actions.getArtistTopAlbumsRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getArtistTopAlbumsRequest())).toStrictEqual(expectedState);
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_SUCCESS', () => {
    const state: State = {...initialState, fetchingAlbums: true};
    expect(reducer(state, actions.getArtistTopAlbumsSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_FAILURE', () => {
    const state: State = {...initialState, fetchingAlbums: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getArtistTopAlbumsFailure(error))).toStrictEqual(expectedState);
  });
});