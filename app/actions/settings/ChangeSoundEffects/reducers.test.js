'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change sound effects reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_SOUND_EFFECTS_REQUEST', () => {
    expect(reducer(initialState, actions.changeSoundEffectsRequest()))
      .toStrictEqual({...initialState, saving: ['sound effects']});

    expect(
      reducer(
        {...initialState, failed: ['sound effects']},
        actions.changeSoundEffectsRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['sound effects']});
  });

  it('should handle CHANGE_SOUND_EFFECTS_SUCCESS', () => {
    const soundEffects: boolean = false;

    expect(
      reducer(
        {...initialState, saving: ['sound effects']},
        actions.changeSoundEffectsSuccess(soundEffects),
      ),
    )
      .toStrictEqual({...initialState, soundEffects});
  });

  it('should handle CHANGE_SOUND_EFFECTS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['sound effects']},
        actions.changeSoundEffectsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['sound effects']});
  });
});