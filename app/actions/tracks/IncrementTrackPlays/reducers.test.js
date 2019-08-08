'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  lastUpdated,
  type Track,
  type State,
} from '../../../reducers/tracks';
import * as actions from './actions';

describe('increment track plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_TRACK_PLAYS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, incrementingCount: true};
    expect(reducer(initialState, actions.incrementTrackPlaysRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.incrementTrackPlaysRequest())).toStrictEqual(expectedState);
  });

  it('should handle INCREMENT_TRACK_PLAYS_SUCCESS', () => {
    const state: State = {...initialState, incrementingCount: true};
    expect(reducer(state, actions.incrementTrackPlaysSuccess())).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_TRACK_PLAYS_FAILURE', () => {
    const state: State = {...initialState, incrementingCount: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.incrementTrackPlaysFailure(error))).toStrictEqual(expectedState);
  });
});