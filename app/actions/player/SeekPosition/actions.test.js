'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('seek position synchronous action creators', () => {
  it('creates request action', () => {
    const expectedAction: Action = {type: types.SEEK_POSITION_REQUEST};
    expect(actions.request()).toStrictEqual(expectedAction);
  });

  it('creates success action', () => {
    const expectedAction: Action = {type: types.SEEK_POSITION_SUCCESS};
    expect(actions.success()).toStrictEqual(expectedAction);
  });

  it('creates failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.SEEK_POSITION_FAILURE,
      error,
    };

    expect(actions.failure(error)).toStrictEqual(expectedAction);
  });
});