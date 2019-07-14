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

describe('get session info reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_SESSION_INFO_REQUEST', () => {
    expect(reducer(initialState, actions.getSessionInfoRequest()))
      .toStrictEqual({...initialState, fetchingInfo: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getSessionInfoRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingInfo: true});
  });

  it('should handle GET_SESSION_INFO_SUCCESS', () => {
    const infoUnsubscribe: () => void = () => {return};
    const currentSessionID: string = 'foo';
    const session: Session = {
      id: 'foo',
      currentQueueID: 'foo',
      currentTrackID: 'foo',
      ownerID: 'foo',
      distance: 0,
      mode: 'foo',
      totalListeners: 0,
      totalPlayed: 0,
      timeLastPlayed: 'foo',
    };

    expect(
      reducer(
        {...initialState, currentSessionID, fetchingInfo: true},
        actions.getSessionInfoSuccess(session, infoUnsubscribe),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          infoUnsubscribe,
          currentSessionID,
          sessionsByID: {
            [currentSessionID]: {...session, listeners: [], lastUpdated: initialState.lastUpdated},
          },
        },
      );

    expect(
      reducer(
        {
          ...initialState,
          currentSessionID,
          fetchingInfo: true,
          sessionsByID: {
            [currentSessionID]: {...session, listeners: ['foo'], lastUpdated: initialState.lastUpdated},
          },
        },
        actions.getSessionInfoSuccess(session, infoUnsubscribe),
      )
    )
      .toStrictEqual(
        {
          ...initialState,
          infoUnsubscribe,
          currentSessionID,
          sessionsByID: {
            [currentSessionID]: {...session, listeners: ['foo'], lastUpdated: initialState.lastUpdated},
          },
        },
      );
  });

  it('should handle GET_SESSION_INFO_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingInfo: true},
        actions.getSessionInfoFailure(error),
      )
    )
      .toStrictEqual({...initialState, error});
  });
});