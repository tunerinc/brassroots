'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('join session synchronous action creators', () => {
  it('creates join session request action', () => {
    const expectedAction: Action = {
      type: types.JOIN_SESSION_REQUEST,
    };

    expect(actions.joinSessionRequest()).toStrictEqual(expectedAction);
  });

  it('creates join session success action', () => {
    const sessionID: string = 'foo';
    const userID: string = 'foo';
    const totalListeners: number = 1;
    const expectedAction: Action = {
      type: types.JOIN_SESSION_SUCCESS,
      sessionID,
      userID,
      totalListeners,
    };

    expect(actions.joinSessionSuccess(sessionID, userID, totalListeners)).toStrictEqual(expectedAction);
  });

  it('creates join session failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.JOIN_SESSION_FAILURE,
      error,
    };

    expect(actions.joinSessionFailure(error)).toStrictEqual(expectedAction);
  });
});