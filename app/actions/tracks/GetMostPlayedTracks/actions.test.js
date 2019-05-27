'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('get most played tracks synchronous action creators', () => {
  it('creates get most played tracks request action', () => {
    const expectedAction: Action = {
      type: types.GET_MOST_PLAYED_TRACKS_REQUEST,
    };

    expect(actions.getMostPlayedTracksRequest()).toStrictEqual(expectedAction);
  });

  it('creates get most played tracks success action', () => {
    const expectedAction: Action = {
      type: types.GET_MOST_PLAYED_TRACKS_SUCCESS,
    };

    expect(actions.getMostPlayedTracksSuccess()).toStrictEqual(expectedAction);
  });

  it('creates get most played tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_MOST_PLAYED_TRACKS_FAILURE,
      error,
    };

    expect(actions.getMostPlayedTracksFailure(error)).toStrictEqual(expectedAction);
  });
});