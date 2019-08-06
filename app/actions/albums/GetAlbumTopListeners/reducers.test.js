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

describe('get album top listeners reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_LISTENERS_REQUEST', () => {
    const state: State = {...initialState, error: new Error('error')};
    const expectedState: State = {...initialState, fetchingListeners: true};
    expect(reducer(state, actions.getAlbumTopListenersRequest())).toStrictEqual(expectedState);
    expect(reducer(initialState, actions.getAlbumTopListenersRequest()))
      .toStrictEqual(expectedState);
  });

  it('handles GET_ALBUM_TOP_LISTENERS_SUCCESS', () => {
    const state: State = {...initialState, fetchingListeners: true};
    expect(reducer(state, actions.getAlbumTopListenersSuccess())).toStrictEqual(initialState);
  });

  it('handles GET_ALBUM_TOP_LISTENERS_FAILURE', () => {
    const state: State = {...initialState, fetchingListeners: true};
    const error: Error = new Error('error');
    const expectedState: State = {...initialState, error};
    expect(reducer(state, actions.getAlbumTopListenersFailure(error))).toStrictEqual(expectedState);
  });
});