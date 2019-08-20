'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateSettings';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/settings';

describe('update settings synchronous action creator', () => {
  it('creates action to update the settings state', () => {
    const updates: State = {initializing: true};
    const expectedAction: Action = {
      type: types.UPDATE_SETTINGS,
      updates,
    }

    expect(actions.updateSettings(updates)).toStrictEqual(expectedAction);
  });
});