'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetOnboarding';
import * as types from '../types';
import type {Action} from '../../../reducers/onboarding';

describe('set onboarding action creator', () => {
  it('creates action setting the onboarding status of the current user', () => {
    const status: boolean = true;
    const expectedAction: Action = {
      type: types.SET_ONBOARDING,
      status,
    };
    
    expect(actions.setOnboarding(status)).toEqual(expectedAction);
  });
});