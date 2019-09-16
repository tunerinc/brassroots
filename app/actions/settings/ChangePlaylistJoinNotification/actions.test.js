'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change playlist join notification synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const playlistJoin: boolean = false;
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS,
      updates: {notify: {playlistJoin}},
    };

    expect(actions.success(playlistJoin)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});