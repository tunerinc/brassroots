'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetPlayer';
import * as types from '../types';
import {type Action} from '../../../reducers/player';

describe('reset player action creator', () => {
  it('creates action to reset the redux player state object', () => {
    const expectedAction: Action = {type: types.RESET_PLAYER};
    expect(actions.resetPlayer()).toStrictEqual(expectedAction);
  });
});