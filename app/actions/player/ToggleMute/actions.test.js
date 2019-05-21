'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('toggle mute synchronous action creators', () => {
  it('creates toggle mute request action', () => {
    const expectedAction: Action = {
      type: types.TOGGLE_MUTE_REQUEST,
    };

    expect(actions.toggleMuteRequest()).toStrictEqual(expectedAction);
  });

  it('creates toggle mute request action', () => {
    const status: boolean = true;
    const expectedAction: Action = {
      type: types.TOGGLE_MUTE_SUCCESS,
      status,
    };

    expect(actions.toggleMuteSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates toggle mute request action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.TOGGLE_MUTE_FAILURE,
      error,
    };

    expect(actions.toggleMuteFailure(error)).toStrictEqual(expectedAction);
  });
});