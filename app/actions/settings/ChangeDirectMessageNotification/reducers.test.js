'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/settings';
import * as actions from './actions';

describe('change direct message notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_DIRECT_MESSAGE_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['direct message']};
    const expectedState: State = {...initialState, saving: ['direct message']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_DIRECT_MESSAGE_NOTIFICATION_SUCCESS', () => {
    const message: boolean = true;
    const state: State = {
      ...initialState,
      notify: {message: false, ...initialState.notify},
      saving: ['direct message'],
    };

    const expectedState: State = {...initialState, notify: {...initialState.notify, message}};
    expect(reducer(state, actions.success(message))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_DIRECT_MESSAGE_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['direct message']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['direct message']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});