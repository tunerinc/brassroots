'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('get artist top tracks synchronous action creators', () => {
  it('creates get artist top tracks request action', () => {
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_TRACKS_REQUEST,
    };

    expect(actions.getArtistTopTracksRequest()).toStrictEqual(expectedAction);
  });

  it('creates get artist top tracks success action', () => {
    const artistID: string = 'foo';
    const trackIDs: Array<string> = ['foo', 'bar'];
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_TRACKS_SUCCESS,
      artistID,
      trackIDs,
    };

    expect(actions.getArtistTopTracksSuccess(artistID, trackIDs)).toStrictEqual(expectedAction);
  });

  it('creates get artist top tracks failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.GET_ARTIST_TOP_TRACKS_FAILURE,
      error,
    };

    expect(actions.getArtistTopTracksFailure(error)).toStrictEqual(expectedAction);
  });
});