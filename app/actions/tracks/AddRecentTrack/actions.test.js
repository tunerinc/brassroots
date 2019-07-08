'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('add recent track synchronous action creators', () => {
  it('creates add recent track request action', () => {
    const expectedAction: Action = {
      type: types.ADD_RECENT_TRACK_REQUEST,
    };

    expect(actions.addRecentTrackRequest()).toStrictEqual(expectedAction);
  });

  it('creates add recent track success action', () => {
    const expectedAction: Action = {
      type: types.ADD_RECENT_TRACK_SUCCESS,
    };

    expect(actions.addRecentTrackSuccess()).toStrictEqual(expectedAction);
  });

  it('creates add recent track failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.ADD_RECENT_TRACK_FAILURE,
      error,
    };

    expect(actions.addRecentTrackFailure(error)).toStrictEqual(expectedAction);
  });
});