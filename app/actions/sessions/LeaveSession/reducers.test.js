'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
  type Session,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('leave session reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle LEAVE_SESSION_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, leavingSession: true};
    expect(reducer(initialState, actions.leaveSessionRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.leaveSessionRequest())).toStrictEqual(expectedState);
  });

  it('should handle LEAVE_SESSION_SUCCESS', () => {
    const sessionID: string = 'foo';
    const isOwner: boolean = true;
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
        actions.leaveSessionSuccess(sessionID, isOwner),
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
        actions.leaveSessionSuccess(sessionID, isOwner),
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
    const state: State = {...initialState, leavingSession: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.leaveSessionFailure(error))).toStrictEqual(expectedState);
  });
});