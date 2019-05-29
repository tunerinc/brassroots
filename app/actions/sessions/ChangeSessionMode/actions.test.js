'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('change session mode synchronous action creators', () => {
  it('creates change session mode request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_MODE_REQUEST,
    };

    expect(actions.changeSessionModeRequest()).toStrictEqual(expectedAction);
  });

  it('creates change session mode success action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_MODE_SUCCESS,
    };

    expect(actions.changeSessionModeSuccess()).toStrictEqual(expectedAction);
  });

  it('creates change session mode failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_SESSION_MODE_FAILURE,
      error,
    };

    expect(actions.changeSessionModeFailure(error)).toStrictEqual(expectedAction);
  });
});