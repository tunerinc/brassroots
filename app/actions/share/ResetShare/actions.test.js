'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetShare';
import * as types from '../types';
import {type Action} from '../../../reducers/share';

describe('reset share action creator', () => {
  it('creates action to reset the share state', () => {
    const expectedAction: Action = {type: types.RESET_SHARE};
    expect(actions.resetShare()).toStrictEqual(expectedAction);
  });
});