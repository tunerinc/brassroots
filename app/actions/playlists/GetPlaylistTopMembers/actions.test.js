'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('get playlist top members synchronous action creators', () => {
  it('creates get playlist top members request action', () => {
    const expectedAction: Action = {type: types.GET_PLAYLIST_TOP_MEMBERS_REQUEST};
    expect(actions.getPlaylistTopMembersRequest()).toStrictEqual(expectedAction);
  });

  it('creates get playlist top members success action', () => {
    const expectedAction: Action = {type: types.GET_PLAYLIST_TOP_MEMBERS_SUCCESS};
    expect(actions.getPlaylistTopMembersSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get playlist top members failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_PLAYLIST_TOP_MEMBERS_FAILURE,
      error,
    };

    expect(actions.getPlaylistTopMembersFailure(error)).toStrictEqual(expectedAction);
  });
});