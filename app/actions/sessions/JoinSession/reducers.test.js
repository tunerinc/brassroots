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

describe('join session reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle JOIN_SESSION_REQUEST', () => {
    expect(reducer(initialState, actions.joinSessionRequest()))
      .toStrictEqual({...initialState, joiningSession: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.joinSessionRequest(),
      ),
    )
      .toStrictEqual({...initialState, joiningSession: true});
  });

  it('should handle JOIN_SESSION_SUCCESS', () => {
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

  it('should handle JOIN_SESSION_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, joiningSession: true},
        actions.joinSessionFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});