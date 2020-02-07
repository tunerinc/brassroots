'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetFeedback';
import * as types from '../types';
import {type Action} from '../../../reducers/feedback';

describe('reset feedback action creator', () => {
  it('creates action to reset the redux feedback state object', () => {
    const expectedAction: Action = {
      type: types.RESET_FEEDBACK,
    };
    
    expect(actions.resetFeedback()).toStrictEqual(expectedAction);
  });
});