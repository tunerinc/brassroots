'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change like track notification synchronous action creators', () => {
  it('creates change like track notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST,
    };

    expect(actions.changeLikeTrackNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change like track notification success action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_LIKE_TRACK_NOTIFICATION_REQUEST,
    };

    expect(actions.changeLikeTrackNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change like track notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_LIKE_TRACK_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changeLikeTrackNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});