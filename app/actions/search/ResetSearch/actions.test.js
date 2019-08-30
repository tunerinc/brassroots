'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetSearch';
import * as types from '../types';
import {type Action} from '../../../reducers/search';

describe('reset search action creator', () => {
  it('creates action to reset the redux search state object', () => {
    const expectedAction: Action = {
      type: types.RESET_SEARCH,
    };
    
    expect(actions.resetSearch()).toStrictEqual(expectedAction);
  });
});