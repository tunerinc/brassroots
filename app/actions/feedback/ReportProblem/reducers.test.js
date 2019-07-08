'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/feedback';
import * as actions from './actions';

describe('report problem reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should return REPORT_PROBLEM_REQUEST', () => {
    expect(reducer(initialState, actions.reportProblemRequest()))
      .toStrictEqual({...initialState, sending: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.reportProblemRequest(),
      ),
    )
      .toStrictEqual({...initialState, sending: true});
  });

  it('should return REPORT_PROBLEM_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, sending: true},
        actions.reportProblemSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should return REPORT_PROBLEM_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, sending: true},
        actions.reportProblemFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});