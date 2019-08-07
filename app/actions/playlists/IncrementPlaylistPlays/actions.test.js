'use strict';

/**
 * @format
 * @flow
 */

import * as actions from './actions';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('increment playlist plays synchronous action creators', () => {
  it('creates increment playlist plays request action', () => {
    const expectedAction: Action = {type: types.INCREMENT_PLAYLIST_PLAYS_REQUEST};
    expect(actions.incrementPlaylistPlaysRequest()).toStrictEqual(expectedAction);
  });

  it('creates increment playlist plays success action', () => {
    const expectedAction: Action = {type: types.INCREMENT_PLAYLIST_PLAYS_SUCCESS};
    expect(actions.incrementPlaylistPlaysSuccess()).toStrictEqual(expectedAction);
  });

  it('creates increment playlist plays failure action', () => {
    const error: Error = new Error('error');
    const expectedAction: Action = {
      type: types.INCREMENT_PLAYLIST_PLAYS_FAILURE,
      error,
    };

    expect(actions.incrementPlaylistPlaysFailure(error)).toStrictEqual(expectedAction);
  });
});