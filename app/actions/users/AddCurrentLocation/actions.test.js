'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddCurrentLocation';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add current location action creator', () => {
  it('creates action adding the current location of the current user', () => {
    const location: {
      latitude: number,
      longitude: number,
    } = {
      latitude: 0,
      longitude: 0,
    };

    const expectedAction: Action = {
      type: types.ADD_CURRENT_LOCATION,
      location,
    };
    
    expect(actions.addCurrentLocation(location)).toEqual(expectedAction);
  });
});