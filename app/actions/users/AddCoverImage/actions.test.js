'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddCoverImage';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add cover image action creator', () => {
  it('creates actiona dding the cover image of the current user', () => {
    const photo: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_COVER_IMAGE,
      photo,
    };
    
    expect(actions.addCoverImage(photo)).toEqual(expectedAction);
  });
});