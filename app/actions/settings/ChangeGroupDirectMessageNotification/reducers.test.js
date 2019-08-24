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

describe('change group direct message notification reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_REQUEST', () => {
    const state: State = {...initialState, failed: ['group message']};
    const expectedState: State = {...initialState, saving: ['group message']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState)
    expect(reducer(state, actions.request())).toStrictEqual(expectedState)
  });

  it('handles CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_SUCCESS', () => {
    const state: State = {...initialState, saving: ['group message']};
    const groupMessage: string = 'foo';
    const expectedState: State = {...initialState, notify: {...initialState.notify, groupMessage}};
    expect(reducer(state, actions.success(groupMessage))).toStrictEqual(expectedState);
  });

  it('handles CHANGE_GROUP_DIRECT_MESSAGE_NOTIFICATION_FAILURE', () => {
    const state: State = {...initialState, saving: ['group message']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error, failed: ['group message']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
  });
});