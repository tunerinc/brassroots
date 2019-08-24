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

describe('change sound effects reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_SOUND_EFFECTS_REQUEST', () => {
    const state: State = {...initialState, failed: ['sound effects']};
    const expectedState: State = {...initialState, saving: ['sound effects']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SOUND_EFFECTS_SUCCESS', () => {
    const state: State = {...initialState, saving: ['sound effects']};
    const soundEffects: boolean = false;
    const expectedState: State = {...initialState, soundEffects};
    expect(reducer(state, actions.success(soundEffects))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_SOUND_EFFECTS_FAILURE', () => {
    const state: State = {...initialState, saving: ['sound effects']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['sound effects']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});