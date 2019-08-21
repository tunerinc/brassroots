'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/playlists';
import * as actions from '../UpdatePlaylists';

describe('update playlists reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_PLAYLISTS', () => {
    const updates: State = {newPlaylist: {name: 'foo', members: ['foo']}};
    const newPlaylist = {...initialState.newPlaylist, name: 'foo', members: ['foo']};
    const expectedState: State = {...initialState, newPlaylist};
    expect(reducer(initialState, actions.updatePlaylists(updates))).toStrictEqual(expectedState);
  });
});