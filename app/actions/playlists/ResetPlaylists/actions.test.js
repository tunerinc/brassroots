'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetPlaylists';
import * as types from '../types';
import {type Action} from '../../../reducers/playlists';

describe('reset playlists action creator', () => {
  it('creates action to reset the redux playlists state object', () => {
    const expectedAction: Action = {
      type: types.RESET_PLAYLISTS,
    };
    
    expect(actions.resetPlaylists()).toStrictEqual(expectedAction);
  });
});