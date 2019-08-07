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
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('increment artist plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_ARTIST_PLAYS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, incrementingCount: true};
    expect(reducer(state, actions.incrementArtistPlaysRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.incrementArtistPlaysRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle INCREMENT_ARTIST_PLAYS_SUCCESS', () => {
    const state: State = {...initialState, incrementingCount: true};
    expect(reducer(state, actions.incrementArtistPlaysSuccess())).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_ARTIST_PLAYS_FAILURE', () => {
    const state: State = {...initialState, error: new Error('error')};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.incrementArtistPlaysFailure(error))).toStrictEqual(expectedState);
  });
});