'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateSession';
import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

describe('update session action creator', () => {
  it('creates action to update a single session with new values', () => {
    const sessionID: string = 'foo';
    const updates: Session = {
      currentTrackID: 'foo',
      currentQueueID: 'foo',
      ownerID: 'foo',
      distance: 1,
      mode: 'foo',
      totalListenrs: 1,
    };

    const expectedAction: Action = {
      type: types.UPDATE_SESSION,
      sessionID,
      updates,
    };

    expect(actions.updateSession(sessionID, updates)).toStrictEqual(expectedAction);
  });
});