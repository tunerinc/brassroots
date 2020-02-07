'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

describe('report user synchronous action creators', () => {
  it('creates report user request action', () => {
    const expectedAction: Action = {type: types.REPORT_USER_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates report user success action', () => {
    const expectedAction: Action = {type: types.REPORT_USER_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates report user failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.REPORT_USER_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});