'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddCurrentContext';
import * as types from '../types';
import {
  type Action,
  type Context,
} from '../../../reducers/queue';

describe('add current context action creator', () => {
  it('creates action to add the current context of a session', () => {
    const context: Context = {
      id: 'foo',
      name: 'foo',
      type: 'foo',
      username: 'foo',
      position: 1,
    };

    const expectedAction: Action = {
      type: types.ADD_CURRENT_CONTEXT,
      context,
    };

    expect(actions.addCurrentContext(context)).toStrictEqual(expectedAction);
  });
});