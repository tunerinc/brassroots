'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change direct message notification synchronous action creators', () => {
  it('creates change direct message notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_REQUEST,
    };

    expect(actions.changeDirectMessageNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change direct message notification success action', () => {
    const status: boolean = true;
    const expectedAction: Action = {
      type: types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changeDirectMessageNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change direct message notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_DIRECT_MESSAGE_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changeDirectMessageNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});