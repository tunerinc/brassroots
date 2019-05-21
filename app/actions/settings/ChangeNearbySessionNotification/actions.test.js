'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change nearby session notification synchronous action creators', () => {
  it('creates change nearby session notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST,
    };

    expect(actions.changeNearbySessionNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change nearby session notification success action', () => {
    const status: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changeNearbySessionNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change nearby session notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changeNearbySessionNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});