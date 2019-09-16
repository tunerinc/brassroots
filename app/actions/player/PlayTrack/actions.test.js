'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('play track synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.PLAY_TRACK_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const currentQueueID: string = 'foo';
    const currentTrackID: string = 'foo';
    const durationMS: number = 0;
    const prevQueueID: string = 'foo';
    const prevTrackID: string = 'foo';
    const expectedAction: Action = {
      type: types.PLAY_TRACK_SUCCESS,
      currentQueueID,
      currentTrackID,
      durationMS,
      prevQueueID,
      prevTrackID,
    };

    const expectedActionTwo: Action = {...expectedAction, prevQueueID: null, prevTrackID: null};

    expect(actions.success(currentQueueID, currentTrackID, durationMS, prevQueueID, prevTrackID))
      .toStrictEqual(expectedAction);

    expect(actions.success(currentQueueID, currentTrackID, durationMS))
      .toStrictEqual(expectedActionTwo);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {type: types.PLAY_TRACK_FAILURE, error};
    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});