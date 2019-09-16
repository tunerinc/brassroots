'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change sessions notification synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.CHANGE_SESSIONS_NOTIFICATION_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const session: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_SESSIONS_NOTIFICATION_SUCCESS,
      updates: {notify: {session}},
    };

    expect(actions.success(session)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_SESSIONS_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});