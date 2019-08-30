'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetTracks';
import * as types from '../types';
import {type Action} from '../../../reducers/tracks';

describe('reset tracks action creator', () => {
  it('creates action to reset the redux tracks state object', () => {
    const expectedAction: Action = {
      type: types.RESET_TRACKS,
    };
    
    expect(actions.resetTracks()).toStrictEqual(expectedAction);
  });
});