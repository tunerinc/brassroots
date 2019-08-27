'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('get playlist tracks synchronous action creators', () => {
  it('creates request action', () => {
    const refreshing: boolean = true;
    const expectedAction: Action = {
      type: types.GET_PLAYLIST_TRACKS_REQUEST,
      refreshing,
    };

    expect(actions.request(refreshing)).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const expectedAction: Action = {type: types.GET_PLAYLIST_TRACKS_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_PLAYLIST_TRACKS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});