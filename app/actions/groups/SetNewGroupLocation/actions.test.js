'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../SetNewGroupLocation';
import * as types from '../types';
import {type Action} from '../../../reducers/groups';

describe('set new group location action creator', () => {
  it('creates action setting the location for the new group being created', () => {
    const location: string = 'foo';
    const expectedAction: Action = {
      type: types.SET_NEW_GROUP_LOCATION,
      location,
    };

    expect(actions.setNewGroupLocation(location)).toEqual(expectedAction);
  });
});