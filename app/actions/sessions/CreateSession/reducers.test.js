'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Session,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('create session reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CREATE_SESSION_REQUEST', () => {
    expect(reducer(initialState, actions.createSessionRequest()))
      .toStrictEqual({...initialState, joiningSession: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.createSessionRequest(),
      ),
    )
      .toStrictEqual({...initialState, joiningSession: true});
  });

  it('should handle CREATE_SESSION_SUCCESS', () => {
    const currentSessionID: string = 'foo';
    const session: Session = {
      id: 'foo',
      currentQueueID: 'foo',
      currentTrackID: 'foo',
      ownerID: 'foo',
      mode: 'foo',
      distance: 0,
      totalListeners: 0,
    };

    expect(
      reducer(
        {...initialState, joiningSession: true},
        actions.createSessionSuccess(session),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          totalSessions: 1,
          currentSessionID,
          sessionsByID: {
            [currentSessionID]: {
              ...session,
              listeners: [],
              timeLastPlayed: null,
              lastUpdated: initialState.lastUpdated,
            },
          },
        },
      );
  });

  it('should handle CREATE_SESSION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, joiningSession: true},
        actions.createSessionFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});