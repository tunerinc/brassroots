'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/sessions';
import * as actions from '../RemoveSession';

describe('remove session reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle REMOVE_SESSION', () => {
    const sessionID: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          totalSessions: 1,
          sessionsByID: {
            [sessionID]: {
              id: sessionID,
              currentTrackID: 'foo',
              currentQueueID: 'foo',
              ownerID: 'foo',
              distance: 0,
              mode: 'foo',
              timeLastPlayed: 'foo',
              lastUpdated: 'foo',
              listeners: [],
              totalListeners: 0,
              chat: ['foo', 'bar'],
            },
          },
        },
        actions.removeSession(sessionID),
      )
    )
      .toStrictEqual(initialState);
  });
});