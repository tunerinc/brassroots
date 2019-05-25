'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Playlist,
} from '../../../reducers/playlists';
import * as actions from './actions';

describe('get playlist top members reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_PLAYLIST_TOP_MEMBERS_REQUEST', () => {
    expect(reducer(initialState, actions.getPlaylistTopMembersRequest()))
      .toStrictEqual({...initialState, fetchingMembers: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getPlaylistTopMembersRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingMembers: true});
  });

  it('should handle GET_PLAYLIST_TOP_MEMBERS_SUCCESS', () => {
    const members: Array<string> = ['foo', 'bar'];
    const playlistID: string = 'foo';
    const playlist: Playlist = {
      id: 'foo',
      name: 'foo',
      ownerID: 'foo',
      image: 'foo',
      private: false,
      members: [],
      tracks: [],
      topTracks: [],
      totalPlays: 0,
      userPlays: 0,
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {...initialState, fetchingMembers: true, playlistsByID: {[playlistID]: playlist}},
        actions.getPlaylistTopMembersSuccess(playlistID, members),
      ),
    )
      .toStrictEqual({...initialState, playlistsByID: {[playlistID]: {...playlist, members}}});
  });

  it('should handle GET_PLAYLIST_TOP_MEMBERS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingMembers: true},
        actions.getPlaylistTopMembersFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});