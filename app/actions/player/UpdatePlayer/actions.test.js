'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../UpdatePlayer';
import * as types from '../types';
import {
  type Action,
  type Updates,
} from '../../../reducers/player';

describe('update player synchronous action creator', () => {
  it('creates action to update the player', () => {
    const updates: Updates = {
      attemptingToPlay: false,
      prevTrackID: 'foo',
      prevQueueID: 'foo',
      currentTrackID: 'foo',
      currentQueueID: 'foo',
      nextTrackID: 'foo',
      nextQueueID: 'foo',
    };

    const expectedAction: Action = {
      type: types.UPDATE_PLAYER,
      updates,
    };

    expect(actions.updatePlayer(updates)).toStrictEqual(expectedAction);
  });
});