'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/feedback';
import * as actions from './actions';

describe('report user reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should return REPORT_USER_REQUEST', () => {
    expect(reducer(initialState, actions.reportUserRequest()))
      .toStrictEqual({...initialState, sending: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.reportUserRequest(),
      ),
    )
      .toStrictEqual({...initialState, sending: true});
  });

  it('should return REPORT_USER_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, sending: true},
        actions.reportUserSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should return REPORT_USER_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, sending: true},
        actions.reportUserFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});