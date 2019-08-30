'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetAlbums';
import * as types from '../types';
import {type Action} from '../../../reducers/albums';

describe('reset albums action creator', () => {
  it('creates action to reset the redux albums state object', () => {
    const expectedAction: Action = {
      type: types.RESET_ALBUMS,
    };
    
    expect(actions.resetAlbums()).toStrictEqual(expectedAction);
  });
});