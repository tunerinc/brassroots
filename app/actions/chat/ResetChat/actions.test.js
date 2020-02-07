'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetChat';
import * as types from '../types';
import {type Action} from '../../../reducers/chat';

describe('reset chat action creator', () => {
  it('creates action to reset the chat reducer', () => {
    const expectedAction: Action = {
      type: types.RESET_CHAT,
    };

    expect(actions.resetChat()).toStrictEqual(expectedAction);
  });
});