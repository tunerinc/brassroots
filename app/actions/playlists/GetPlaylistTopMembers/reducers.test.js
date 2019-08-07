'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Playlist,
  type State,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlist top members reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TOP_MEMBERS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingMembers: true};
    expect(reducer(state, actions.getPlaylistTopMembersRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.getPlaylistTopMembersRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle GET_PLAYLIST_TOP_MEMBERS_SUCCESS', () => {
    const state: State = {...initialState, fetchingMembers: true};
    expect(reducer(state, actions.getPlaylistTopMembersSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TOP_MEMBERS_FAILURE', () => {
    const state: State = {...initialState, fetchingMembers: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getPlaylistTopMembersFailure(error))).toStrictEqual(expectedState);
  });
});