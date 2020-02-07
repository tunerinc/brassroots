'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetArtists';
import * as types from '../types';
import {type Action} from '../../../reducers/artists';

describe('reset artists action creator', () => {
  it('creates action to reset the redux artists state object', () => {
    const expectedAction: Action = {
      type: types.RESET_ARTISTS,
    };
    
    expect(actions.resetArtists()).toStrictEqual(expectedAction);
  });
});