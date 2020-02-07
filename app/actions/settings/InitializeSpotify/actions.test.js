'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('initialize spotify synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.INITIALIZE_SPOTIFY_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const loggedIn: boolean = true;
    const expectedAction: Action = {
      type: types.INITIALIZE_SPOTIFY_SUCCESS,
      loggedIn,
    };

    expect(actions.success(loggedIn)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.INITIALIZE_SPOTIFY_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});