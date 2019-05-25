'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('get top playlists synchronous action creators', () => {
  it('creates get top playlists request action', () => {
    const expectedAction: Action = {
      type: types.GET_TOP_PLAYLISTS_REQUEST,
    };

    expect(actions.getTopPlaylistsRequest()).toStrictEqual(expectedAction);
  });

  it('creates get top playlists success action', () => {
    const expectedAction: Action = {
      type: types.GET_TOP_PLAYLISTS_SUCCESS,
    };

    expect(actions.getTopPlaylistsSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get top playlists failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_TOP_PLAYLISTS_FAILURE,
      error,
    };

    expect(actions.getTopPlaylistsFailure(error)).toStrictEqual(expectedAction);
  });
});