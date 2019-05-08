'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change playlist join notification synchronous action creators', () => {
  it('creates change playlist join notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_REQUEST,
    };

    expect(actions.changePlaylistJoinNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change playlist join notification success action', () => {
    const status: boolean = false;
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changePlaylistJoinNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change playlist join notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_JOIN_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changePlaylistJoinNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});