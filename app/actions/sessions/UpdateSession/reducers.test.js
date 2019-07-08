'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {initialState, lastUpdated} from '../../../reducers/sessions';
import * as actions from '../UpdateSession';

describe('update session reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle UPDATE_SESSION', () => {
    const sessionID: string = 'foo';

    expect(
      reducer(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {
              lastUpdated,
              id: sessionID,
              currentTrackID: 'foo',
              currentQueueID: 'foo',
              ownerID: 'foo',
              distance: 0,
              mode: 'foo',
              listeners: [],
              totalListeners: 0,
              chat: [],
            },
          },
        },
        actions.updateSession(sessionID, {currentTrackID: 'bar', currentQueueID: 'bar'}),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {
              lastUpdated,
              id: sessionID,
              currentTrackID: 'bar',
              currentQueueID: 'bar',
              ownerID: 'foo',
              distance: 0,
              mode: 'foo',
              listeners: [],
              totalListeners: 0,
              chat: [],
            },
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {
              lastUpdated,
              id: sessionID,
              currentTrackID: 'foo',
              currentQueueID: 'foo',
              ownerID: 'foo',
              distance: 0,
              mode: 'foo',
              listeners: [],
              totalListeners: 0,
              chat: [],
            },
          },
        },
        actions.updateSession(sessionID, {ownerID: 'bar', distance: 20}),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {
              lastUpdated,
              id: sessionID,
              currentTrackID: 'foo',
              currentQueueID: 'foo',
              ownerID: 'bar',
              distance: 20,
              mode: 'foo',
              listeners: [],
              totalListeners: 0,
              chat: [],
            },
          },
        }
      );

    expect(
      reducer(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {
              lastUpdated,
              id: sessionID,
              currentTrackID: 'foo',
              currentQueueID: 'foo',
              ownerID: 'foo',
              distance: 0,
              mode: 'foo',
              listeners: [],
              totalListeners: 0,
              chat: [],
            },
          },
        },
        actions.updateSession(sessionID, {mode: 'bar', totalListeners: 10}),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {
              lastUpdated,
              id: sessionID,
              currentTrackID: 'foo',
              currentQueueID: 'foo',
              ownerID: 'foo',
              distance: 0,
              mode: 'bar',
              listeners: [],
              totalListeners: 10,
              chat: [],
            },
          },
        }
      );
  });
});