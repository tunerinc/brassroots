'use strict';

/**
 * @format
 * @flow
 */

import reducer, {
  initialState,
  type Updates,
} from '../../../reducers/player';
import * as actions from '../UpdatePlayer';

describe('update player reducer', () => {
  it('returns intial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('handles UPDATE_PLAYER', () => {
    const updates: Updates = {
      attemptingToPlay: true,
      prevTrackID: 'foo',
      prevQueueID: 'foo',
      currentTrackID: 'foo',
      currentQueueID: 'foo',
      nextTrackID: 'foo',
      nextQueueID: 'foo',
      durationMS: 0,
      progress: 0,
      paused: true,
    };

    expect(reducer(initialState, actions.updatePlayer(updates)))
      .toStrictEqual(
        {
          ...initialState,
          ...updates,
        },
      );
  });
});