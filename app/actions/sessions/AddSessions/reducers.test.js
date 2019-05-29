'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import reducer, {
  initialState,
  type Session,
} from '../../../reducers/sessions';
import * as actions from '../AddSessions';

describe('add sessions reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle ADD_SESSIONS', () => {
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

    expect(reducer(initialState, actions.addSessions(sessions)))
      .toStrictEqual(
        {
          ...initialState,
          totalSessions: 2,
          sessionsByID: {
            'foo': {
              ...sessions.foo,
              timeLastPlayed: null,
              listeners: [],
              lastUpdated: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
            },
            'bar': {
              ...sessions.bar,
              timeLastPlayed: null,
              listeners: [],
              lastUpdated: moment().format('ddd, MMM D, YYYY, h:mm:ss a'),
            },
          },
        },
      );
  });
});