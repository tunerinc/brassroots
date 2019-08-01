'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('start player synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.START_PLAYER_REQUEST};
    expect(actions.startPlayerRequest()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const expectedAction: Action = {type: types.START_PLAYER_SUCCESS};
    expect(actions.startPlayerSuccess()).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.START_PLAYER_FAILURE,
      error,
    };

    expect(actions.startPlayerFailure(error)).toStrictEqual(expectedAction);
  });
});