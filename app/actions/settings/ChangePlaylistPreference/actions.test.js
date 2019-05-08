'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/settings';

describe('change playlist preference synchronous action creators', () => {
  it('creates change playlist preference request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_PREFERENCE_REQUEST,
    };

    expect(actions.changePlaylistPreferenceRequest()).toStrictEqual(expectedAction);
  });

  it('creates change playlist preference success action', () => {
    const status: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_PREFERENCE_SUCCESS,
      status,
    };

    expect(actions.changePlaylistPreferenceSuccess(status)).toStrictEqual(expectedAction);
  });

  it('creates change playlist preference failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_PREFERENCE_FAILURE,
      error,
    };

    expect(actions.changePlaylistPreferenceFailure(error)).toStrictEqual(expectedAction);
  });
});