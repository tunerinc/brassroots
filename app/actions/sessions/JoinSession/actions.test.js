'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('join session synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.JOIN_SESSION_REQUEST};
    expect(actions.joinSessionRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const sessionID: string = 'foo';
    const expectedAction: Action = {
      type: types.JOIN_SESSION_SUCCESS,
      sessionID,
    };

    expect(actions.joinSessionSuccess(sessionID)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.JOIN_SESSION_FAILURE,
      error,
    };

    expect(actions.joinSessionFailure(error)).toStrictEqual(expectedAction);
  });
});