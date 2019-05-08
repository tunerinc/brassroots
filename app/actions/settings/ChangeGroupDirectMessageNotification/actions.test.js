'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change group direct message notification synchronous action creators', () => {
  it('creates change group direct message notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST,
    };

    expect(actions.changeGroupDirectMessageNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change group direct message notification success action', () => {
    const status: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changeGroupDirectMessageNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change group direct message notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changeGroupDirectMessageNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});