'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddSharedItems';
import * as types from '../types';
import type {Action, SharedItems} from '../../../reducers/share';

describe('add shared items action creator', () => {
  it('creates actiona dding the items that are being shared from the current user', () => {
    const items: SharedItems = {
      foo: {
        id: 'foo',
        type: 'album',
      },
      bar: {
        id: 'bar',
        type: 'track',
      },
    };
    const expectedAction: Action = {
      type: types.ADD_SHARED_ITEMS,
      items,
    };
    
    expect(actions.addSharedItems(items)).toStrictEqual(expectedAction);
  });
});