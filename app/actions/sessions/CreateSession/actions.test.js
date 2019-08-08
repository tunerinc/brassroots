'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

describe('create session synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.CREATE_SESSION_REQUEST};
    expect(actions.createSessionRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const sessionID: string = 'foo';
    const expectedAction: Action = {
      type: types.CREATE_SESSION_SUCCESS,
      sessionID,
    };

    expect(actions.createSessionSuccess(sessionID)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CREATE_SESSION_FAILURE,
      error,
    };

    expect(actions.createSessionFailure(error)).toStrictEqual(expectedAction);
  });
});