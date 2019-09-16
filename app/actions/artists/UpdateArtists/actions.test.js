'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateArtists';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/artists';

describe('update artists synchronous action creator', () => {
  it('creates action to update the artists state', () => {
    const updates: State = {refreshing: true};
    const expectedAction: Action = {
      type: types.UPDATE_ARTISTS,
      updates,
    }

    expect(actions.updateArtists(updates)).toStrictEqual(expectedAction);
  });
});