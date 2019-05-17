'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/player';

describe('pause player synchronous action creators', () => {
  it('creates pause player request action', () => {
    const expectedAction: Action = {
      type: types.PAUSE_PLAYER_REQUEST,
    };

    expect(actions.pausePlayerRequest()).toStrictEqual(expectedAction);
  });

  it('creates pause player success action', () => {
    const expectedAction: Action = {
      type: types.PAUSE_PLAYER_SUCCESS,
    };

    expect(actions.pausePlayerSuccess()).toStrictEqual(expectedAction);
  });

  it('creates pause player failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.PAUSE_PLAYER_FAILURE,
      error,
    };

    expect(actions.pausePlayerFailure(error)).toStrictEqual(expectedAction);
  });
});