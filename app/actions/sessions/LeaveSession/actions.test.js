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
    expect(actions.leaveSessionRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const sessionID: string = 'foo';
    const isOwner: boolean = true;
    const expectedAction: Action = {
      type: types.LEAVE_SESSION_SUCCESS,
      sessionID,
      isOwner,
    };
    expect(actions.leaveSessionSuccess(sessionID, isOwner)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.LEAVE_SESSION_FAILURE,
      error,
    };

    expect(actions.leaveSessionFailure(error)).toStrictEqual(expectedAction);
  });
});