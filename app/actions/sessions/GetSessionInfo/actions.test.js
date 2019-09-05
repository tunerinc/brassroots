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

describe('get session info synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.GET_SESSION_INFO_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const unsubscribe: () => void = () => {return};
    const expectedAction: Action = {
      type: types.GET_SESSION_INFO_SUCCESS,
      unsubscribe,
    };

    expect(actions.success(unsubscribe)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_SESSION_INFO_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});