'use strict';

import reducer, {
  initialState,
  type Artist,
  type State,
} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artist top playlists reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_PLAYLISTS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingPlaylists: true};
    expect(reducer(state, actions.getArtistTopPlaylistsRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.getArtistTopPlaylistsRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle GET_ARTIST_TOP_PLAYLISTS_SUCCESS', () => {
    const state: State = {...initialState, fetchingPlaylists: true};
    expect(reducer(state, actions.getArtistTopPlaylistsSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_PLAYLISTS_FAILURE', () => {
    const state: State = {...initialState, fetchingPlaylists: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getArtistTopPlaylistsFailure(error))).toStrictEqual(expectedState);
  });
});