'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from './actions';

describe('get favorite track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_FAVORITE_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.getFavoriteTrackRequest()))
      .toStrictEqual({...initialState, fetchingFavoriteTrack: true});;

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.getFavoriteTrackRequest(),
      ),
    )
      .toStrictEqual({...initialState, fetchingFavoriteTrack: true});;
  });

  it('should handle GET_FAVORITE_TRACK_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, fetchingFavoriteTrack: true},
        actions.getFavoriteTrackSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle GET_FAVORITE_TRACK_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, fetchingFavoriteTrack: true},
        actions.getFavoriteTrackFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});;
  });
});