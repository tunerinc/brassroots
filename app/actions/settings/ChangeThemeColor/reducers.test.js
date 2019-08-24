'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/settings';
import * as actions from './actions';

describe('change theme color reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_THEME_COLOR_REQUEST', () => {
    const state: State = {...initialState, failed: ['theme']};
    const expectedState: State = {...initialState, saving: ['theme']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_THEME_COLOR_SUCCESS', () => {
    const state: State = {...initialState, saving: ['theme']};
    const theme: string = 'foo';
    const expectedState: State = {...initialState, theme};
    expect(reducer(state, actions.success(theme))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_THEME_COLOR_FAILURE', () => {
    const state: State = {...initialState, saving: ['theme']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['theme']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});