'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/onboarding';
import * as actions from '../SetOnboarding';

describe('set onboarding reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_ONBOARDING', () => {
    const onboarding: boolean = true;

    expect(reducer(initialState, actions.setOnboarding(onboarding)))
      .toEqual(
        {
          ...initialState,
          onboarding,
        }
      );
  });
});