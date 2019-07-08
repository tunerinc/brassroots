'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddSessions';
import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

describe('add sessions action creator', () => {
  it('creates action to add sessions to Redux', () => {
    const sessions: {
      +[id: string]: Session,
    } = {
      'foo': {
        id: 'foo',
        currentTrackID: 'foo',
        currentQueueID: 'foo',
        ownerID: 'foo',
        distance: 0,
        mode: 'foo',
        totalListeners: 0,
      },
      'bar': {
        id: 'bar',
        currentTrackID: 'bar',
        currentQueueID: 'bar',
        ownerID: 'bar',
        distance: 0,
        mode: 'bar',
        totalListeners: 0,
      },
    };

    const expectedAction: Action = {
      type: types.ADD_SESSIONS,
      sessions,
    };

    expect(actions.addSessions(sessions)).toStrictEqual(expectedAction);
  });
});