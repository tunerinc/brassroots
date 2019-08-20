'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/onboarding';
import * as actions from '../UpdateOnboarding';

describe('update onboarding reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_ONBOARDING', () => {
    const updates: State = {onboarding: true};
    const expectedState: State = {...initialState, onboarding: true};
    expect(reducer(initialState, actions.updateOnboarding(updates))).toStrictEqual(expectedState);
  });
});