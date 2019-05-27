'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('increment track plays synchronous action creators', () => {
  it('creates increment track plays request action', () => {
    const expectedAction: Action = {
      type: types.INCREMENT_TRACK_PLAYS_REQUEST,
    };

    expect(actions.incrementTrackPlaysRequest()).toStrictEqual(expectedAction);
  });

  it('creates increment track plays success action', () => {
    const trackID: string = 'foo';
    const trackCount: number = 1;
    const expectedAction: Action = {
      type: types.INCREMENT_TRACK_PLAYS_SUCCESS,
      trackID,
      trackCount,
    };

    expect(actions.incrementTrackPlaysSuccess(trackID, trackCount)).toStrictEqual(expectedAction);
  });

  it('creates increment track plays failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.INCREMENT_TRACK_PLAYS_FAILURE,
      error,
    };

    expect(actions.incrementTrackPlaysFailure(error)).toStrictEqual(expectedAction);
  });
});