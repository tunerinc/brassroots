'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  lastUpdated,
  type State,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('increment playlist plays reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles INCREMENT_PLAYLIST_PLAYS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, incrementing: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles INCREMENT_PLAYLIST_PLAYS_SUCCESS', () => {
    const state: State = {...initialState, incrementing: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles INCREMENT_PLAYLIST_PLAYS_FAILURE', () => {
    const state: State = {...initialState, incrementing: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});