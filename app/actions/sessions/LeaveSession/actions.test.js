'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('leave session synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.LEAVE_SESSION_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const isOwner: boolean = true;
    const expectedAction: Action = {
      type: types.LEAVE_SESSION_SUCCESS,
      isOwner,
    };

    expect(actions.success(isOwner)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.LEAVE_SESSION_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});