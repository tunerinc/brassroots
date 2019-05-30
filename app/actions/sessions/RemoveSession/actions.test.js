'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../RemoveSession';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('remove session action creator', () => {
  it('creates action to remove a session from Redux', () => {
    const sessionID: string = 'foo';
    const expectedAction: Action = {
      type: types.REMOVE_SESSION,
      sessionID,
    };

    expect(actions.removeSession(sessionID)).toStrictEqual(expectedAction);
  });
});