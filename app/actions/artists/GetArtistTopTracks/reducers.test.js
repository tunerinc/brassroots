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

describe('get artist top tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingTracks: true};
    expect(reducer(initialState, actions.getArtistTopTracksRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getArtistTopTracksRequest())).toStrictEqual(expectedState);
  });

  it('should handle GET_ARTIST_TOP_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetchingTracks: true};
    expect(reducer(state, actions.getArtistTopTracksSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetchingTracks: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getArtistTopTracksFailure(error))).toStrictEqual(expectedState);
  });
});