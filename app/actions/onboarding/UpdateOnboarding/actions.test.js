'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateOnboarding';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/onboarding';

describe('update onboarding synchronous action creator', () => {
  it('creates action to update the onboarding state', () => {
    const updates: State = {onboarding: true};
    const expectedAction: Action = {
      type: types.UPDATE_ONBOARDING,
      updates,
    }

    expect(actions.updateOnboarding(updates)).toStrictEqual(expectedAction);
  });
});