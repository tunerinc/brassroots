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

describe('start player reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle START_PLAYER_REQUEST', () => {
    const expectedState: State = {...initialState, attemptingToPlay: true};
    expect(reducer(initialState, actions.startPlayerRequest())).toStrictEqual(expectedState);
  });

  it('should handle START_PLAYER_SUCCESS', () => {
    const state: State = {...initialState, attemptingToPlay: true};
    const expectedState: State = {...initialState, attemptingToPlay: false, paused: false};
    expect(reducer(state, actions.startPlayerSuccess())).toStrictEqual(expectedState);
  });

  it('should handle START_PLAYER_FAILURE', () => {
    const state: State = {...initialState, attemptingToPlay: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, attemptingToPlay: false};
    expect(reducer(state, actions.startPlayerFailure(error))).toStrictEqual(expectedState);
  });
});