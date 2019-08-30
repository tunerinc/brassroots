'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/onboarding';
import * as actions from '../ResetOnboarding';

describe('reset onboarding reducer', () => {
  it('should handle RESET_ONBOARDING', () => {
    expect(
      reducer(
        {
          ...initialState,
          usernameUnique: true,
          profileCreated: true,
        },
        actions.resetOnboarding()
      )
    )
      .toStrictEqual(initialState);
  });
});