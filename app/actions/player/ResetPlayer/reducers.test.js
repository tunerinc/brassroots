'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/player';
import * as actions from '../ResetPlayer';

describe('reset player reducer', () => {
  it('should handle RESET_PLAYER', () => {
    const state: State = {...initialState, currentTrackID: 'foo', progress: 1000};
    expect(reducer(state, actions.resetPlayer())).toStrictEqual(initialState);
  });
});