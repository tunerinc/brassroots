'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateAlbums';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/albums';

describe('update albums synchronous action creator', () => {
  it('creates action to update the albums state', () => {
    const updates: State = {refreshing: true};
    const expectedAction: Action = {
      type: types.UPDATE_ALBUMS,
      updates,
    }

    expect(actions.updateAlbums(updates)).toStrictEqual(expectedAction);
  });
});