'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

describe('report problem synchronous action creators', () => {
  it('creates report problem request action', () => {
    const expectedAction: Action = {
      type: types.REPORT_PROBLEM_REQUEST,
    };

    expect(actions.reportProblemRequest()).toStrictEqual(expectedAction);
  });

  it('creates report problem success action', () => {
    const expectedAction: Action = {
      type: types.REPORT_PROBLEM_SUCCESS,
    };

    expect(actions.reportProblemSuccess()).toStrictEqual(expectedAction);
  });

  it('creates report problem failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.REPORT_PROBLEM_FAILURE,
      error,
    };

    expect(actions.reportProblemFailure(error)).toStrictEqual(expectedAction);
  });
});