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

describe('get session info reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_SESSION_INFO_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['trending']};
    const expectedState: State = {...initialState, fetching: ['info']};
    const expectedStateTwo: State = {...initialState, fetching: ['trending', 'info']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles GET_SESSION_INFO_SUCCESS', () => {
    const infoUnsubscribe: () => void = () => {return};
    const state: State = {...initialState, fetching: ['info']};
    const stateTwo: State = {...initialState, fetching: ['trending', 'info']};
    const expectedState: State = {...initialState, infoUnsubscribe};
    const expectedStateTwo: State = {...expectedState, fetching: ['trending']};
    expect(reducer(state, actions.success(infoUnsubscribe))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.success(infoUnsubscribe))).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_SESSION_INFO_FAILURE', () => {
    const state: State = {...initialState, fetching: ['info']};
    const stateTwo: State = {...initialState, fetching: ['trending', 'info']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['trending']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});