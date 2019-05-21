'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change playlist change notification synchronous action creators', () => {
  it('creates change playlist change notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST,
    };

    expect(actions.changePlaylistChangeNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change playlist change notification success action', () => {
    const status: boolean = false;
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changePlaylistChangeNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change playlist change notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changePlaylistChangeNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});