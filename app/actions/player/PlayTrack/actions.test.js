'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import type {Action} from '../../../reducers/player';

describe('play track synchronous action creators', () => {
  it('creates play track request action', () => {
    const expectedAction: Action = {
      type: types.PLAY_TRACK_REQUEST,
    };

    expect(actions.playTrackRequest()).toStrictEqual(expectedAction);
  });

  it('creates play track success action', () => {
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;
    const expectedAction: Action = {
      type: types.PLAY_TRACK_SUCCESS,
      currentQueueID,
      currentTrackID,
      durationMS,
    };

    expect(actions.playTrackSuccess(currentQueueID, currentTrackID, durationMS))
      .toStrictEqual(expectedAction);
  });

  it('creates play track failure action', () => {
    const error = new Error('error');
    const expectedAction: Action = {
      type: types.PLAY_TRACK_FAILURE,
      error,
    };

    expect(actions.playTrackFailure(error)).toStrictEqual(expectedAction);
  });
});