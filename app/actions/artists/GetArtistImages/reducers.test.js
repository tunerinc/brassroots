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
import updateObject from '../../../utils/updateObject';
import * as actions from './actions';

describe('get artist images reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ARTIST_IMAGES_REQUEST', () => {
    const state: State = {...initialState, fetching: ['topTracks']};
    const expectedState: State = {...initialState, fetching: ['images']};
    const expectedStateTwo: State = {...initialState, fetching: ['topTracks', 'images']};
    expect(reducer(initialState, actions.request())).toStrictEqual(expectedState);
    expect(reducer(state, actions.request())).toStrictEqual(expectedStateTwo);
  });

  it('handles GET_ARTIST_IMAGES_SUCCESS', () => {
    const state: State = {...initialState, fetching: ['images']};
    const stateTwo: State = {...initialState, fetching: ['images', 'topTracks']};
    const expectedState: State = {...initialState, fetching: ['topTracks']};
    expect(reducer(state, actions.success())).toStrictEqual(initialState);
    expect(reducer(stateTwo, actions.success())).toStrictEqual(expectedState);
  });

  it('handles GET_ARTIST_IMAGES_FAILURE', () => {
    const state: State = {...initialState, fetching: ['images']};
    const stateTwo: State = {...initialState, fetching: ['topTracks', 'images']};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    const expectedStateTwo: State = {...expectedState, fetching: ['topTracks']};
    expect(reducer(state, actions.failure(error))).toStrictEqual(expectedState);
    expect(reducer(stateTwo, actions.failure(error))).toStrictEqual(expectedStateTwo);
  });
});