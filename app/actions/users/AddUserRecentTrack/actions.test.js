'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../AddUserRecentTrack';
import * as types from '../types';
import {type Action} from '../../../reducers/users';

describe('add user recent track action creator', () => {
  it('creates action to add a recent track to a user', () => {
    const trackID: string = 'foo';
    const expectedAction: Action = {
      type: types.ADD_USER_RECENT_TRACK,
      trackID,
    };

    expect(actions.addUserRecentTrack(trackID)).toStrictEqual(expectedAction);
  });
});