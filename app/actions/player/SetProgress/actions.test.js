'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetProgress';
import * as types from '../types';
import type {Action} from '../../../reducers/player';

describe('set progress synchronous action creator', () => {
  it('creates action to set the progress of the player', () => {
    const progress: number = 1000;
    const expectedAction: Action = {
      type: types.SET_PROGRESS,
      progress,
    };

    expect(actions.setProgress(progress)).toStrictEqual(expectedAction);
  });
});