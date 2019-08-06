'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Album,
  type State,
} from '../../../reducers/albums';
import * as actions from './actions';

describe('get album top playlists reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_PLAYLISTS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingPlaylists: true};
    expect(reducer(state, actions.getAlbumTopPlaylistsRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.getAlbumTopPlaylistsRequest()))
      .toStrictEqual(expectedState);
  });

  it('handles GET_ALBUM_TOP_PLAYLISTS_SUCCESS', () => {
    const state: State = {...initialState, fetchingPlaylists: true};
    expect(reducer(state, actions.getAlbumTopPlaylistsSuccess())).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_PLAYLISTS_FAILURE', () => {
    const state: State = {...initialState, fetchingPlaylists: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getAlbumTopPlaylistsFailure(error))).toStrictEqual(expectedState);
  });
});