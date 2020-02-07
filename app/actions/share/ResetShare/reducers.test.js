'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/share';
import * as actions from '../ResetShare';
import * as types from '../types';

describe('reset share reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CLEAR_SHARE', () => {
    const state: State = {...initialState, text: 'foo', recipients: ['foo']};
    expect(reducer(state, actions.resetShare())).toStrictEqual(initialState);
  });
});