'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {
  type Action,
  type Session,
} from '../../../reducers/sessions';

describe('get session info synchronous action creators', () => {
  it('creates get session info request action', () => {
    const expectedAction: Action = {
      type: types.GET_SESSION_INFO_REQUEST,
    };

    expect(actions.getSessionInfoRequest()).toStrictEqual(expectedAction);
  });

  it('creates get session info success action', () => {
    const unsubscribe: () => void = () => {return};
    const session: Session = {
      id: 'foo',
      currentQueueID: 'foo',
      currentTrackID: 'foo',
      ownerID: 'foo',
      distance: 0,
      mode: 'foo',
      totalListeners: 0,
    };

    const expectedAction: Action = {
      type: types.GET_SESSION_INFO_SUCCESS,
      session,
      unsubscribe,
    };

    expect(actions.getSessionInfoSuccess(session, unsubscribe)).toStrictEqual(expectedAction);
  });

  it('creates get session info failure action', () => {
    const error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_SESSION_INFO_FAILURE,
      error,
    };

    expect(actions.getSessionInfoFailure(error)).toStrictEqual(expectedAction);
  });
});