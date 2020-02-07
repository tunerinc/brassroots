'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateFeedback';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/feedback';

describe('update feedback synchronous action creator', () => {
  it('creates action to update the feedback state', () => {
    const updates: State = {sending: true};
    const expectedAction: Action = {
      type: types.UPDATE_FEEDBACK,
      updates,
    }

    expect(actions.updateFeedback(updates)).toStrictEqual(expectedAction);
  });
});