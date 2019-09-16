'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateSessions';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/sessions';

describe('update sessions synchronous action creator', () => {
  it('creates action to update the sessions state', () => {
    const updates: State = {explore: {trendingIDs: ['foo']}};
    const expectedAction: Action = {
      type: types.UPDATE_SESSIONS,
      updates,
    }

    expect(actions.updateSessions(updates)).toStrictEqual(expectedAction);
  });
});