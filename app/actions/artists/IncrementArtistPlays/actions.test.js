'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('increment artist plays synchronous action creators', () => {
  it('creates increment artist plays request action', () => {
    const expectedAction: Action = {type: types.INCREMENT_ARTIST_PLAYS_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates increment artist plays success action', () => {
    const expectedAction: Action = {type: types.INCREMENT_ARTIST_PLAYS_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates increment artist plays failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.INCREMENT_ARTIST_PLAYS_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});