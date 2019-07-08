'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('change favorite track synchronous action creators', () => {
  it('creates change favorite track request action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_FAVORITE_TRACK_REQUEST,
    };

    expect(actions.changeFavoriteTrackRequest()).toStrictEqual(expectedAction);
  });

  it('creates change favorite track success action', () => {
    const expectedAction: Action = {
      type: types.CHANGE_FAVORITE_TRACK_SUCCESS,
    };

    expect(actions.changeFavoriteTrackSuccess()).toStrictEqual(expectedAction);
  });

  it('creates change favorite track failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.CHANGE_FAVORITE_TRACK_FAILURE,
      error,
    };

    expect(actions.changeFavoriteTrackFailure(error)).toStrictEqual(expectedAction);
  });
});