'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Album,
  type State,
} from '../../../reducers/albums';
import * as actions from './actions';

describe('get album top tracks reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_TRACKS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...initialState, fetching: ['topListeners']};
    const expectedState: State = {...initialState, fetching: ['topTracks']};
    const expectedStateTwo: State = {...initialState, fetching: ['topListeners', 'topTracks']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_ALBUM_TOP_TRACKS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['topTracks']};
    const stateTwo: State = {...state, fetching: ['topTracks', 'topListeners']};
    const expectedState: State = {...initialState, fetching: ['topListeners']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_ALBUM_TOP_TRACKS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['topTracks']};
    const stateTwo: State = {...initialState, fetching: ['topListeners', 'topTracks']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...initialState, error, fetching: ['topListeners']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});