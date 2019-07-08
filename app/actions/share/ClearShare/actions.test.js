'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ClearShare';
import * as types from '../types';
import {type Action} from '../../../reducers/share';

describe('clear share action creator', () => {
  it('creates action clearing the share', () => {
    const expectedAction: Action = {
      type: types.CLEAR_SHARE,
    };
    
    expect(actions.clearShare()).toEqual(expectedAction);
  });
});