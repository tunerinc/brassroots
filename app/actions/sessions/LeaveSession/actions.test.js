'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('leave session synchronous action creators', () => {
  it('creates leave session request action', () => {
    const expectedAction: Action = {
      type: types.LEAVE_SESSION_REQUEST,
    };

    expect(actions.leaveSessionRequest()).toStrictEqual(expectedAction);
  });

  it('creates leave session success action', () => {
    const sessionID: string = 'foo';
    const expectedAction: Action = {
      type: types.LEAVE_SESSION_SUCCESS,
      sessionID
      
    };
    expect(actions.leaveSessionSuccess(sessionID)).toStrictEqual(expectedAction);
  });

  it('creates leave session failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.LEAVE_SESSION_FAILURE,
      error,
    };

    expect(actions.leaveSessionFailure(error)).toStrictEqual(expectedAction);
  });
});