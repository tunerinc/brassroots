'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('change playlist preference synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.CHANGE_PLAYLIST_PREFERENCE_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const playlist: string = 'foo';
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_PREFERENCE_SUCCESS,
      updates: {preference: {playlist}},
    };

    expect(actions.success(playlist)).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_PLAYLIST_PREFERENCE_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});