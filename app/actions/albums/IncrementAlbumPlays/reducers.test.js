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

describe('increment album plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_ALBUM_PLAYS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, incrementingCount: true};
    expect(reducer(initialState, actions.incrementAlbumPlaysRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.incrementAlbumPlaysRequest())).toStrictEqual(expectedState);
  });

  it('should handle INCREMENT_ALBUM_PLAYS_SUCCESS', () => {
    const state: State = {...initialState, incrementingCount: true};
    expect(reducer(state, actions.incrementAlbumPlaysSuccess())).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_ALBUM_PLAYS_FAILURE', () => {
    const state: State = {...initialState, incrementingCount: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.incrementAlbumPlaysFailure(error))).toStrictEqual(expectedState);
  });
});