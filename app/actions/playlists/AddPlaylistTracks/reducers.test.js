'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/playlists';
import * as actions from '../AddPlaylistTracks';
import updateObject from '../../../utils/updateObject';

type PlaylistTrack = {|
  +trackID: string,
  +userID: string,
|};

describe('add playlist tracks reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_PLAYLIST_TRACKS', () => {
    const playlistID: string = 'foo';
    const tracks: Array<PlaylistTrack> = [
      {trackID: 'foo', userID: 'foo'},
      {trackID: 'bar', userID: 'bar'},
    ];

    expect(reducer(initialState, actions.addPlaylistTracks(playlistID, tracks)))
      .toStrictEqual(
        {
          ...initialState,
          totalPlaylistTracks: 2,
          playlistTracksByID: tracks.reduce((trackList, track) => {
            const playlistTrackID: string = `${playlistID}-${track.trackID}`;

            return updateObject(trackList, {
              [playlistTrackID]: {...track, playlistTrackID, userPlays: 0, totalPlays: 0},
            });
          }, {}),
        },
      );
  });
});