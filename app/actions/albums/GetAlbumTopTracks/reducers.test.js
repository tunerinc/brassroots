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

describe('get album top tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingTracks: true};
    expect(reducer(initialState, actions.getAlbumTopTracksRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getAlbumTopTracksRequest())).toStrictEqual(expectedState);
  });

  it('handles GET_ALBUM_TOP_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetchingTracks: true};
    expect(reducer(state, actions.getAlbumTopTracksSuccess())).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetchingTracks: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getAlbumTopTracksFailure(error))).toStrictEqual(expectedState);
  });
});