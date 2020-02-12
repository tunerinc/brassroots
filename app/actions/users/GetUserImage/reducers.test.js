'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/users';
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('get user image reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_USER_IMAGE_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['topPlaylists']};
    const expectedState: State = {...initialState, fetching: ['images']};
    const expectedStateTwo: State = {...initialState, fetching: ['topPlaylists', 'images']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_USER_IMAGE_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['images']};
    const stateTwo: State = {...initialState, fetching: ['topPlaylists', 'images']};
    const expectedState: State = {...initialState, fetching: ['topPlaylists']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_USER_IMAGE_FAILURE', () => {
    const state: State = {...initialState, fetching: ['images']};
    const stateTwo: State = {...initialState, fetching: ['topPlaylists', 'images']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topPlaylists']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});