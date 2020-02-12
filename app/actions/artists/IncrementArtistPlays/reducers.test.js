'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/artists';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('increment artist plays reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles INCREMENT_ARTIST_PLAYS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, incrementing: true};
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.request()))
      .toStrictEqual(expectedState);
  });

  it('handles INCREMENT_ARTIST_PLAYS_SUCCESS', () => {
    const state: State = {...initialState, incrementing: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles INCREMENT_ARTIST_PLAYS_FAILURE', () => {
    const state: State = {...initialState, error: new Error('error')};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});