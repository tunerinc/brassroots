'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddPlaylistTracks';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('add playlist tracks synchronous action creator', () => {
  it('creates action to add tracks from a playlist', () => {
    const playlistID: string = 'foo';
    const tracks: Array<
      {
        trackID: string,
        userID: string,
      }
    > = [
      {trackID: 'foo', userID: 'foo'},
      {trackID: 'bar', userID: 'bar'},
    ];

    const expectedAction: Action = {
      type: types.ADD_PLAYLIST_TRACKS,
      playlistID,
      tracks,
    };

    expect(actions.addPlaylistTracks(playlistID, tracks)).toStrictEqual(expectedAction);
  });
});