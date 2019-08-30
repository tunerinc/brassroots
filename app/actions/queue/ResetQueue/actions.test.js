'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetQueue';
import * as types from '../types';
import {type Action} from '../../../reducers/queue';

describe('reset queue action creator', () => {
  it('creates action to reset the redux queue state object', () => {
    const expectedAction: Action = {type: types.RESET_QUEUE};
    expect(actions.resetQueue()).toStrictEqual(expectedAction);
  });
});