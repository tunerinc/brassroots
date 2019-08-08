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

describe('get session info reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_SESSION_INFO_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingInfo: true};
    expect(reducer(initialState, actions.getSessionInfoRequest())).toStrictEqual(expectedState);
    expect(reducer(state, actions.getSessionInfoRequest())).toStrictEqual(expectedState);
  });

  it('handles GET_SESSION_INFO_SUCCESS', () => {
    const infoUnsubscribe: () => void = () => {return};
    const state: State = {...initialState, fetchingInfo: true};
    const expectedState: State = {...initialState, infoUnsubscribe};
    expect(reducer(state, actions.getSessionInfoSuccess(infoUnsubscribe)))
  });

  it('handles GET_SESSION_INFO_FAILURE', () => {
    const state: State = {...initialState, fetchingInfo: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getSessionInfoFailure(error))).toStrictEqual(expectedState);
  });
});