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

describe('leave session reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle LEAVE_SESSION_REQUEST', () => {
    expect(reducer(initialState, actions.leaveSessionRequest()))
      .toStrictEqual({...initialState, leavingSession: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.leaveSessionRequest(),
      ),
    )
      .toStrictEqual({...initialState, leavingSession: true});
  });

  it('should handle LEAVE_SESSION_SUCCESS', () => {
    const sessionID: string = 'foo';
    const totalListeners: number = 100;
    const session: Session = {
      id: 'foo',
      currentTrackID: 'foo',
      currentQueueID: 'foo',
      ownerID: 'foo',
      distance: 0,
      mode: 'foo',
      timeLastPlayed: 'foo',
      listeners: ['foo', 'bar'],
      totalListeners: 100,
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {...initialState, leavingSession: true, sessionsByID: {[sessionID]: session}},
        actions.leaveSessionSuccess(sessionID),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {...session, listeners: [], totalListeners: totalListeners - 1},
          },
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          leavingSession: true,
          sessionsByID: {
            [sessionID]: session,
            bar: session,
          },
        },
        actions.leaveSessionSuccess(sessionID),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          sessionsByID: {
            [sessionID]: {...session, listeners: [], totalListeners: totalListeners - 1},
            bar: session,
          },
        },
      );
  });

  it('should handle LEAVE_SESSION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, leavingSession: true},
        actions.leaveSessionFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});