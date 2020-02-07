'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetSettings';
import * as types from '../types';
import {type Action} from '../../../reducers/settings';

describe('reset settings action creator', () => {
  it('creates action to reset the redux settings state object', () => {
    const expectedAction: Action = {
      type: types.RESET_SETTINGS,
    };
    
    expect(actions.resetSettings()).toStrictEqual(expectedAction);
  });
});