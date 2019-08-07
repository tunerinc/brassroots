'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  lastUpdated,
  type Playlist,
  type PlaylistTrack,
  type State,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('increment playlist plays reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_PLAYLIST_PLAYS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, incrementingCount: true};
    expect(reducer(state, actions.incrementPlaylistPlaysRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.incrementPlaylistPlaysRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle INCREMENT_PLAYLIST_PLAYS_SUCCESS', () => {
    const state: State = {...initialState, incrementingCount: true};
    expect(reducer(state, actions.incrementPlaylistPlaysSuccess())).toStrictEqual(initialState);
  });

  it('should handle INCREMENT_PLAYLIST_PLAYS_FAILURE', () => {
    const state: State = {...initialState, incrementingCount: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.incrementPlaylistPlaysFailure(error))).toStrictEqual(expectedState);
  });
});