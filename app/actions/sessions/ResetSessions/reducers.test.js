'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/sessions';
import * as actions from '../ResetSessions';

describe('reset sessions reducer', () => {
  it('handles RESET_SESSIONS', () => {
    const state: State = {...initialState, saving: true};
    expect(reducer(state, actions.resetSessions())).toStrictEqual(initialState);
  });
});