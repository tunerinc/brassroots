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
  it('creates create session request action', () => {
    const expectedAction: Action = {
      type: types.CREATE_SESSION_REQUEST,
    };

    expect(actions.createSessionRequest()).toStrictEqual(expectedAction);
  });

  it('creates create session success action', () => {
    const session: Session = {
      id: 'foo',
      currentQueueID: 'foo',
      currentTrackID: 'foo',
      ownerID: 'foo',
      mode: 'foo',
      distance: 0,
      totalListeners: 0,
    };

    const expectedAction: Action = {
      type: types.CREATE_SESSION_SUCCESS,
      session,
    };

    expect(actions.createSessionSuccess(session)).toStrictEqual(expectedAction);
  });

  it('creates create session failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CREATE_SESSION_FAILURE,
      error,
    };

    expect(actions.createSessionFailure(error)).toStrictEqual(expectedAction);
  });
});