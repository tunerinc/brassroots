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
    const expectedAction: Action = {type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates change playlist change notification success action', () => {
    const playlistChange: boolean = false;
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_SUCCESS,
      updates: {notify: {playlistChange}},
    };

    expect(actions.success(playlistChange)).toStrictEqual(expectedAction);
  });

  it('creates change playlist change notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_CHANGE_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});