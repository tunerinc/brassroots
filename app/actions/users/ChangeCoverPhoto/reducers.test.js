'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type State,
} from '../../../reducers/users';
import * as actions from './actions';

describe('change cover reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles CHANGE_COVER_PHOTO_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['topPlaylists']};
    const expectedState: State = {...initialState, fetching: ['cover']};
    const expectedStateTwo: State = {...initialState, fetching: ['topPlaylists', 'cover']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles CHANGE_COVER_PHOTO_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['cover']};
    const stateTwo: State = {...initialState, fetching: ['topPlaylists', 'cover']};
    const expectedState: State = {...initialState, fetching: ['topPlaylists']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles CHANGE_COVER_PHOTO_FAILURE', () => {
    const state: State = {...initialState, fetching: ['cover']};
    const stateTwo: State = {...initialState, fetching: ['topPlaylists', 'cover']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topPlaylists']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});