'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/legal';
import * as actions from './actions';

describe('get terms reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_TERMS_REQUEST', () => {
    const state: State = {...initialState, terms: {...initialState.terms, error: new Error('error')}};
    const refreshing: boolean = true;
    const expectedState: State = {...initialState, terms: {...initialState.terms, fetching: true}};
    const refreshState: State = {...initialState, terms: {...expectedState.terms, refreshing}};
    expect(reducer(initialState, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.request(refreshing))).toStrictEqual(refreshState);
    expect(reducer(state, actions.request(!refreshing))).toStrictEqual(expectedState);
    expect(reducer(state, actions.request(refreshing))).toStrictEqual(refreshState);
  });

  it('handles GET_TERMS_SUCCESS', () => {
    const state: State = {...initialState, terms: {...initialState.terms, refreshing: true, fetching: true}};
    const text: string = 'foo';
    const expectedState: State = {...initialState, terms: {...initialState.terms, text}};
    expect(reducer(state, actions.success(text))).toStrictEqual(expectedState);
  });

  it('handles GET_TERMS_FAILURE', () => {
    const state: State = {...initialState, terms: {...initialState.terms, refreshing: true, fetching: true}};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, terms: {...initialState.terms, error}};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});