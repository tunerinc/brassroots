'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetOnboarding';
import * as types from '../types';
import {type Action} from '../../../reducers/onboarding';

describe('reset onboarding action creator', () => {
  it('creates action to reset the redux onboarding state object', () => {
    const expectedAction: Action = {
      type: types.RESET_ONBOARDING,
    };
    
    expect(actions.resetOnboarding()).toStrictEqual(expectedAction);
  });
});