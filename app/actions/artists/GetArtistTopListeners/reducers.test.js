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

describe('get artist top listeners reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_LISTENERS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingListeners: true};
    expect(reducer(state, actions.getArtistTopListenersRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.getArtistTopListenersRequest()))
      .toStrictEqual(expectedState);
  });

  it('should handle GET_ARTIST_TOP_LISTENERS_SUCCESS', () => {
    const state: State = {...initialState, fetchingListeners: true};
    expect(reducer(state, actions.getArtistTopListenersSuccess())).toStrictEqual(initialState);
  });

  it('should handle GET_ARTIST_TOP_LISTENERS_FAILURE', () => {
    const state: State = {...initialState, fetchingListeners: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getArtistTopListenersFailure(error))).toStrictEqual(expectedState);
  });
});