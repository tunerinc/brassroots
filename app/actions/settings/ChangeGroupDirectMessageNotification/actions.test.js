'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change group direct message notification synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const groupMessage: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS,
      updates: {notify: {groupMessage}},
    };

    expect(actions.success(groupMessage)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});