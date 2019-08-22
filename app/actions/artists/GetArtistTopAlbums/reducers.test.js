'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Artist,
  type State,
} from '../../../reducers/artists';
import * as actions from './actions';

describe('get artist top albums reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const stateTwo: State = {...state, fetching: ['artists']};
    const expectedState: State = {...initialState, fetching: ['topAlbums']};
    const expectedStateTwo: State = {...initialState, fetching: ['artists', 'topAlbums']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['topAlbums']};
    const stateTwo: State = {...initialState, fetching: ['albums', 'topAlbums']};
    const expectedState: State = {...initialState, fetching: ['albums']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('should handle GET_ARTIST_TOP_ALBUMS_FAILURE', () => {
    const state: State = {...initialState, fetching: ['topAlbums']};
    const stateTwo: State = {...initialState, fetching: ['artists', 'topAlbums']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['artists']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});