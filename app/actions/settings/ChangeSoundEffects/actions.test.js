'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change sound effects synchronous action creators', () => {
  it('creates change sound effects request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_SOUND_EFFECTS_REQUEST,
    };

    expect(actions.changeSoundEffectsRequest()).toStrictEqual(expectedAction);
  });

  it('creates change sound effects success action', () => {
    const status: boolean = true;
    const expectedAction: Action = {
      type: types.CHANGE_SOUND_EFFECTS_SUCCESS,
      status,
    };

    expect(actions.changeSoundEffectsSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change sound effects failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_SOUND_EFFECTS_FAILURE,
      error,
    };

    expect(actions.changeSoundEffectsFailure(error)).toStrictEqual(expectedAction);
  });
});