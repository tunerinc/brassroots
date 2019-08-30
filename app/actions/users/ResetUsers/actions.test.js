'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetUsers';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('reset users action creator', () => {
  it('creates action to reset the redux users state object', () => {
    const expectedAction: Action = {type: types.RESET_USERS};
    expect(actions.resetUsers()).toStrictEqual(expectedAction);
  });
});