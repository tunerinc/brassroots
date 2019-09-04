'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/sessions';
import * as actions from './actions';

const infoUnsubscribe: () => void = () => {return};

describe('stop session info listener reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles STOP_SESSION_INFO_LISTENER_REQUEST', () => {
    const state: State = {...initialState, infoUnsubscribe};
    expect(reducer(state, actions.request())).toStrictEqual(state);
  });

  it('handles STOP_SESSION_INFO_LISTENER_SUCCESS', () => {
    const state: State = {...initialState, infoUnsubscribe, leaving: true};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
  });

  it('handles STOP_SESSION_INFO_LISTENER_FAILURE', () => {
    const state: State = {...initialState, infoUnsubscribe, leaving: true};
    const error: Error = new Error('error');
    const expectedState: State = {...state, error, leaving: false};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});