'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateShare';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/share';

describe('update share synchronous action creator', () => {
  it('creates action to update the share state', () => {
    const updates: State = {sharedItem: {id: 'foo', type: 'foo'}};
    const expectedAction: Action = {
      type: types.UPDATE_SHARE,
      updates,
    }

    expect(actions.updateShare(updates)).toStrictEqual(expectedAction);
  });
});