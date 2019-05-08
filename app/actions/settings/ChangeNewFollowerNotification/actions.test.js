'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change new follower notification synchronous action creators', () => {
  it('creates change new follower notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_NEW_FOLLOWER_NOTIFICATION_REQUEST,
    };

    expect(actions.changeNewFollowerNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change new follower notification success action', () => {
    const status: boolean = false;
    const expectedAction: Action = {
      type: types.CHANGE_NEW_FOLLOWER_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changeNewFollowerNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change new follower notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_NEW_FOLLOWER_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changeNewFollowerNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});