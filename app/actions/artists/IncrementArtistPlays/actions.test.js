'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('increment artist plays synchronous action creators', () => {
  it('creates increment artist plays request action', () => {
    const expectedAction: Action = {type: types.INCREMENT_ARTIST_PLAYS_REQUEST};
    expect(actions.incrementArtistPlaysRequest()).toStrictEqual(expectedAction);
  });

  it('creates increment artist plays success action', () => {
    const expectedAction: Action = {type: types.INCREMENT_ARTIST_PLAYS_SUCCESS};
    expect(actions.incrementArtistPlaysSuccess()).toStrictEqual(expectedAction);
  });

  it('creates increment artist plays failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.INCREMENT_ARTIST_PLAYS_FAILURE,
      error,
    };

    expect(actions.incrementArtistPlaysFailure(error)).toStrictEqual(expectedAction);
  });
});