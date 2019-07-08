'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/tracks';
import * as actions from './actions';

describe('change favorite track reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_FAVORITE_TRACK_REQUEST', () => {
    expect(reducer(initialState, actions.changeFavoriteTrackRequest()))
      .toStrictEqual({...initialState, changingFavoriteTrack: true});

    expect(
      reducer(
        {...initialState, error: new Error('error')},
        actions.changeFavoriteTrackRequest(),
      ),
    )
      .toStrictEqual({...initialState, changingFavoriteTrack: true});
  });

  it('should handle CHANGE_FAVORITE_TRACK_SUCCESS', () => {
    expect(
      reducer(
        {...initialState, changingFavoriteTrack: true},
        actions.changeFavoriteTrackSuccess(),
      ),
    )
      .toStrictEqual(initialState);
  });

  it('should handle CHANGE_FAVORITE_TRACK_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, changingFavoriteTrack: true},
        actions.changeFavoriteTrackFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error});
  });
});