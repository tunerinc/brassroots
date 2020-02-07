'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdateTracks';
import * as types from '../types';
import {
  type Action,
  type State,
} from '../../../reducers/tracks';

describe('update tracks synchronous action creator', () => {
  it('creates action to update the tracks state', () => {
    const updates: State = {refreshing: true};
    const expectedAction: Action = {
      type: types.UPDATE_TRACKS,
      updates,
    }

    expect(actions.updateTracks(updates)).toStrictEqual(expectedAction);
  });
});