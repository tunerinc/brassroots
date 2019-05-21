'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change sessions notification synchronous action creators', () => {
  it('creates change sessions notification request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_SESSIONS_NOTIFICATION_REQUEST,
    };

    expect(actions.changeSessionsNotificationRequest()).toStrictEqual(expectedAction);
  });

  it('creates change sessions notification success action', () => {
    const status: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_SESSIONS_NOTIFICATION_SUCCESS,
      status,
    };

    expect(actions.changeSessionsNotificationSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change sessions notification failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_SESSIONS_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.changeSessionsNotificationFailure(error)).toStrictEqual(expectedAction);
  });
});