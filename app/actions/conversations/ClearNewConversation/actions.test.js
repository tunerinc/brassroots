'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ClearNewConversation';
import * as types from '../types';
import {type Action} from '../../../reducers/conversations';

describe('clear new conversation action creator', () => {
  it('creates action to clear the new conversation for the current user', () => {
    const expectedAction: Action = {
      type: types.CLEAR_NEW_CONVERSATION,
    };
    
    expect(actions.clearNewConversation()).toEqual(expectedAction);
  });
});