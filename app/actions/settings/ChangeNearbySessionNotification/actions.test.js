'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change nearby session notification synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const nearbySession: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_SUCCESS,
      updates: {notify: {nearbySession}},
    };

    expect(actions.success(nearbySession)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_NEARBY_SESSION_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});