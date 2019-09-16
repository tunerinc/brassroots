'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateGroups';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/groups';

describe('update groups synchronous action creator', () => {
  it('creates action to update the groups state', () => {
    const updates: State = {newGroup: {website: 'foo', members: ['foo']}};
    const expectedAction: Action = {
      type: types.UPDATE_GROUPS,
      updates,
    }

    expect(actions.updateGroups(updates)).toStrictEqual(expectedAction);
  });
});