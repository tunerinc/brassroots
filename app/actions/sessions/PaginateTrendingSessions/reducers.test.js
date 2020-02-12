'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('paginate trending sessions reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles PAGINATE_TRENDING_SESSIONS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, paginating: true};
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles PAGINATE_TRENDING_SESSIONS_SUCCESS', () => {
    const state: State = {...initialState, paginating: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles PAGINATE_TRENDING_SESSIONS_FAILURE', () => {
    const state: State = {...initialState, paginating: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});