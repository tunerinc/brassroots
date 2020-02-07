'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/player';
import * as actions from './actions';

describe('seek position reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles SEEK_POSITION_REQUEST', () => {
    const expectedState: State = {...initialState, seeking: true};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
  });

  it('handles SEEK_POSITION_SUCCESS', () => {
    const state: State = {...initialState, seeking: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles SEEK_POSITION_FAILURE', () => {
    const state: State = {...initialState, seeking: true}
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});