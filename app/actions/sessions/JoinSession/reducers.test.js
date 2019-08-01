'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Session,
  type State,
} from '../../../reducers/sessions';
import * as actions from './actions';

describe('join session reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles JOIN_SESSION_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, joiningSession: true};
    expect(reducer(initialState, actions.joinSessionRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.joinSessionRequest())).toStrictEqual(expectedState);
  });

  it('handles JOIN_SESSION_SUCCESS', () => {
    const currentSessionID: string = 'foo';
    const userID: string = 'foo';
    const totalListeners: number = 100;
    const session: Session = {
      id: 'foo',
      currentTrackID: 'foo',
      currentQueueID: 'foo',
      ownerID: 'foo',
      distance: 0,
      mode: 'foo',
      timeLastPlayed: 'foo',
      listeners: ['bar'],
      totalListeners: totalListeners - 1,
      totalPlayed: 0,
      lastUpdated: initialState.lastUpdated,
    };

    expect(
      reducer(
        {...initialState, joiningSession: true, sessionsByID: {[currentSessionID]: session}},
        actions.joinSessionSuccess(currentSessionID, userID, totalListeners),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          currentSessionID,
          sessionsByID: {
            [currentSessionID]: {...session, totalListeners, listeners: ['bar', 'foo']},
          },
        },
      );
  });

  it('handles JOIN_SESSION_FAILURE', () => {
    const error: Error = new Error('error');
    const state: State = {...initialState, joiningSession: true};
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.joinSessionFailure(error))).toStrictEqual(expectedState);
  });
});