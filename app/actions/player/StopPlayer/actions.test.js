'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/player';

describe('stop player synchronous action creators', () => {
  it('creates stop player request action', () => {
    const expectedAction: Action = {
      type: types.STOP_PLAYER_REQUEST,
    };

    expect(actions.stopPlayerRequest()).toStrictEqual(expectedAction);
  });

  it('creates stop player success action', () => {
    const expectedAction: Action = {
      type: types.STOP_PLAYER_SUCCESS,
    };

    expect(actions.stopPlayerSuccess()).toStrictEqual(expectedAction);
  });

  it('creates stop player failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.STOP_PLAYER_FAILURE,
      error,
    };

    expect(actions.stopPlayerFailure(error)).toStrictEqual(expectedAction);
  });
});